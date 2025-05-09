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
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Email e senha são obrigatórios'
                ]
            ];
        }

        $email = trim($data['email']);
        $password = trim($data['password']);

        if (empty($data['email']) || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8 || strlen($email) > 50) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Email inválido e/ou senha deve ter pelo menos 8 caracteres'
                ]
            ];
        }

        $account = $this->client->getByEmail($email);
        if ($account && count($account) > 0) {
            if (password_verify($password, $account['password'])) {
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => [
                            'email' => $account['email'],
                            'code' => $account['code']
                        ]
                    ]
                ];
            }
            return [
                'code' => 401,
                'body' => [
                    'status' => 'error',
                    'message' => 'E-mail ou senha incorretos'
                ]
            ];
        }
        return [
            'code' => 401,
            'body' => [
                'status' => 'error',
                'message' => 'E-mail ou senha incorretos'
            ]
        ];
    }

    public function signup($data)
    {
        if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['phone']) || empty($data['validationScreen'])) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Dados Inválidos'
                ]
            ];
        }

        $name = trim($data['name']);
        $email = trim($data['email']);
        $password = trim($data['password']);
        $phone = trim($data['phone']);
        $validationScreen = trim($data['validationScreen']);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'E-mail inválido'
                ]
            ];
        }
        if (strlen($email) > 50 || strlen($password) < 8 || strlen($password) > 30 || strlen($name) < 3 || strlen($name) > 30) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Tamanho dos dados inválido. E-mail deve conter menos que 50 caracteres, Senha deve conter entre 8 e 30 caracteres, e nome deve conter entre 3 e 30 caracteres'
                ]
            ];
        }


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
                        'code' => 201,
                        'body' => [
                            'status' => 'success',
                            'message' => [
                                'validationEmail' => 'Um e-mail de validação foi enviado para ' . $email,
                                'email' => $email
                            ]
                        ]
                    ];
                }
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => [
                            'validationEmail' => 'Erro ao enviar e-mail de validação para ' . $email,
                            'email' => $email
                        ]
                    ]
                ];
            }
            return [
                'code' => 500,
                'body' => [
                    'status' => 'error',
                    'message' => 'Erro ao registrar no banco de dados'
                ]
            ];
        }
        return [
            'code' => 409,
            'body' => [
                'status' => 'error',
                'message' => 'E-mail já cadastrado'
            ]
        ];
    }

    public function validateEmail($data)
    {
        if (empty($data['code'])) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Sem código para verificar'
                ]
            ];
        }

        $code = trim($data['code']);
        $account = $this->client->getByCode($code);

        if ($account && count($account) > 0) {
            if ($account['verified'] == 1) {
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => 'Este e-mail já foi verificado'
                    ]
                ];
            }

            $validateEmail = $this->client->update($account['id'], null, null, null, null, 1);

            if ($validateEmail) {
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => 'E-mail validado com sucesso'
                    ]
                ];
            }
            return [
                'code' => 500,
                'body' => [
                    'status' => 'error',
                    'message' => 'Erro ao validar o e-mail'
                ]
            ];
        }
        return [
            'code' => 404,
            'body' => [
                'status' => 'error',
                'message' => 'Nenhuma conta encontrada com este código'
            ]
        ];
    }

    // Ver forma de como o usuário irá informar o id para deletar ou alterar informações
    public function delete($data)
    {
        if (empty($data['id'])) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Nenhum id foi informado'
                ]
            ];
        }
        $id = trim($data['id']);
        if (!is_numeric($id)) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Id informado não é um número'
                ]
            ];
        }
        $account = $this->client->getById($id);
        if ($account && count($account) > 0) {
            if ($this->client->delete($id)) {
                return [
                    'code' => 204,
                    'body' => [
                        'status' => 'success',
                        'message' => 'Conta excluída com sucesso'
                    ]
                ];
            }
            return [
                'code' => 500,
                'body' => [
                    'status' => 'error',
                    'message' => 'Erro ao excluir do banco de dados'
                ]
            ];
        }
        return [
            'code' => 404,
            'body' => [
                'status' => 'error',
                'message' => 'Nenhuma conta encontrada com este Id'
            ]
        ];
    }

    public function changeInfo($data)
    {
        if (empty($data['id'])) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Nenhum id foi informado'
                ]
            ];
        }
        $id = trim($data['id']);
        if (!is_numeric($id)) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Id informado não é um número'
                ]
            ];
        }

        if (empty($data['name']) && empty($data['email']) && empty($data['phone'])) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Nenhum dado novo foi informado'
                ]
            ];
        }

        if (empty($data['password'])) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Senha atual não foi informada'
                ]
            ];
        }
        $account = $this->client->getById($id);
        if (!$account || count($account) <= 0) {
            return [
                'code' => 404,
                'body' => ''
            ];
        }
    }
}
