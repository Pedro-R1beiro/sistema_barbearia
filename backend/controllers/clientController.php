<?php

require_once __DIR__ . '/../bd.php';
require_once __DIR__ . '/../classes/availability.php';
require_once __DIR__ . '/../classes/client.php';
require_once __DIR__ . '/../classes/dayOff.php';
require_once __DIR__ . '/../classes/professional.php';
require_once __DIR__ . '/../classes/scheduling.php';
require_once __DIR__ . '/../classes/vacation.php';
require_once __DIR__ . '/../email/emailSender.php';

class ClientController
{
    public $conn;

    public $client;
    public $prof;
    public $avai;
    public $dayOff;
    public $vac;
    public $sche;

    public $emailSender;

    public function __construct()
    {
        $bd = new Database;
        $this->conn = $bd->connect();

        $this->client = new Client($this->conn);
        $this->prof = new Professional($this->conn);
        $this->avai = new Availability($this->conn);
        $this->dayOff = new DayOff($this->conn);
        $this->vac = new Vacation($this->conn);
        $this->sche = new Scheduling($this->conn);

        $this->emailSender = new EmailSender;
    }

    public function login($data)
    {
        if (empty($data['email']) || empty($data['password'])) {
            return ['status' => 'error', 'message' => 'Email e senha obrigatórios'];
        }

        $email = trim($data['email']);
        $password = trim($data['password']);

        $account = $this->client->getByEmail($email);
        if ($account && count($account) > 0) {
            if (password_verify($password, $account['password'])) {
                return [
                    'status' => 'sucess',
                    'message' => [
                        'email' => $account['email'],
                        'code' => $account['code']
                    ]
                ];
            } else {
                return [
                    'status' => 'error',
                    'message' => 'senha incorreta'
                ];
            }
        } else {
            return [
                'status' => 'error',
                'message' => 'email inexistente'
            ];
        }
    }

    public function signup($data)
    {
        if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['phone']) || empty($data['validationScreen'])) {
            return ['status' => 'error', 'message' => 'Dados Insuficientes'];
        }

        $name = trim($data['name']);
        $email = trim($data['email']);
        $password = trim($data['password']);
        $phone = trim($data['phone']);
        $validationScreen = trim($data['validationScreen']);

        $account = $this->client->getByEmail($email);
        if (!$account || count($account) <= 0) {
            $code = $this->client->post($name, $email, $password, $phone);
            if ($code) {
                $subject = "Validar Email";
                $HTMLbody = "Para validar seu e-mail, clique no link a seguir: <a href='$validationScreen?code=$code'>Validar E-mail</a>";
                $textBody = "Para validar seu e-mail, acesse o link a seguir: $validationScreen?code=$code";
                $sendEmail = $this->emailSender->sendEmail($email, $name, $subject, $HTMLbody, $textBody);
                if ($sendEmail) {
                    return [
                        'status' => 'sucess',
                        'message' => [
                            'validation email' => 'Um e-mail de validação foi enviado para ' . $email,
                            'email' => $email
                        ]
                    ];
                } else {
                    return [
                        'status' => 'sucess',
                        'message' => [
                            'validation email' => 'Erro ao enviar e-mail de validação para ' . $email,
                            'email' => $email
                        ]
                    ];
                }
            } else {
                return [
                    'status' => 'error',
                    'message' => 'erro ao registrar no banco de dados'
                ];
            }
        } else {
            return [
                'status' => 'error',
                'message' => 'e-mail já cadastrado'
            ];
        }
    }

    public function validateEmail($data)
    {
        if (empty($data['code'])) {
            return ['status' => 'error', 'message' => 'Sem código para verificar'];
        }
        $code = trim($data['code']);
        $account = $this->client->getByCode($code);
        if ($account && count($account) > 0) {
            if ($account['verified'] == 1) {
                return [
                    'status' => 'sucess',
                    'message' => 'Este e-mail já foi verificado'
                ];
            }
            $validateEmail = $this->client->update($account['id'], null, null, null, null, 1);
            if ($validateEmail) {
                return [
                    'status' => 'sucess',
                    'message' => 'E-mail validado com sucesso'
                ];
            } else {
                return [
                    'status' => 'error',
                    'message' => 'Erro ao validar o e-mail'
                ];
            }
        } else {
            return [
                'status' => 'error',
                'message' => 'Nenhuma conta encontrada com este código'
            ];
        }
    }
}
