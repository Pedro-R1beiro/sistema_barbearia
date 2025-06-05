<?php

class Signup
{
    private $client;
    private $emailSender;

    public function __construct($client, $emailSender) {
        
    }

    public function default($data)
    {
        try {
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
                        'message' => 'Tamanho dos dados inválido.'
                    ]
                ];
            }

            $account = $this->client->getByEmail($email);
            if ($account && count($account) > 0) {
                return [
                    'code' => 409,
                    'body' => [
                        'status' => 'error',
                        'message' => 'E-mail já cadastrado'
                    ]
                ];
            }

            $code = $this->client->post($name, $email, $password, $phone);
            if (!$code) {
                return [
                    'code' => 500,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Erro ao criar conta'
                    ]
                ];
            }

            $subject = "Validar Email";
            $HTMLbody = "Para validar seu e-mail, clique no link: <a href='$validationScreen?code=$code'>Validar E-mail</a>";
            $textBody = "Para validar seu e-mail, acesse: $validationScreen?code=$code";
            $sendEmail = $this->emailSender->sendEmail($email, $name, $subject, $HTMLbody, $textBody);

            return [
                'code' => $sendEmail ? 201 : 200,
                'body' => [
                    'status' => 'success',
                    'message' => [
                        'validationEmail' => ($sendEmail ? 'Um e-mail de validação foi enviado' : 'Erro ao enviar e-mail de validação') . " para $email",
                        'email' => $email
                    ]
                ]
            ];
        } catch (Exception $e) {
            return [
                'code' => 500,
                'body' => [
                    'status' => 'error',
                    'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
                ]
            ];
        }
    }
}
