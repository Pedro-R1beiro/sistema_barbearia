<?php

require_once __DIR__ . '/../../bd.php';
require_once __DIR__ . '/../../classes/client.php';
require_once __DIR__ . '/../../email/emailSender.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ClientPost
{
    public $conn;
    public $client;
    public $emailSender;

    public function __construct()
    {
        $bd = new Database;
        $this->conn = $bd->connect();
        $this->client = new Client($this->conn);
        $this->emailSender = new EmailSender;
    }

    public function authenticate()
    {
        if (!isset($_COOKIE['auth_token'])) {
            return [
                'code' => 401,
                'body' => [
                    'status' => 'error',
                    'message' => 'Não autenticado'
                ]
            ];
        }

        $key = 'qwe1!rty2@uiop3asd4$fgh5%jklç6';

        try {
            $decoded = JWT::decode($_COOKIE['auth_token'], new Key($key, 'HS256'));
            return (array) $decoded;
        } catch (Exception $e) {
            return [
                'code' => 401,
                'body' => [
                    'status' => 'error',
                    'message' => 'Token inválido'
                ]
            ];
        }
    }

    public function login($data)
    {
        try {
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

            if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8 || strlen($email) > 50) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Email inválido e/ou senha deve ter pelo menos 8 caracteres'
                    ]
                ];
            }

            $account = $this->client->getByEmail($email);
            if (!$account || !password_verify($password, $account['password'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'E-mail ou senha incorretos'
                    ]
                ];
            }

            if ($account['verified'] == 0) {
                return [
                    'code' => 401,
                    'body' => [
                        'status' => 'error',
                        'message' => 'E-mail não verificado'
                    ]
                ];
            }

            $key = 'qwe1!rty2@uiop3asd4$fgh5%jklç6';
            $payload = [
                'sub' => $account['id'],
                'code' => $account['code'],
                'iat' => time(),
                'exp' => time() + (60 * 60 * 24 * 7)
            ];
            $jwt = JWT::encode($payload, $key, 'HS256');
            setcookie('auth_token', $jwt, [
                'expires' => time() + (60 * 60 * 24 * 7),
                'path' => '/',
                'httponly' => true,
                'secure' => true,
                'samesite' => 'Lax'
            ]);

            return [
                'code' => 200,
                'body' => [
                    'status' => 'success',
                    'message' => [
                        'email' => $account['email']
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

    public function signup($data)
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

    public function sendRecoveryEmail($data)
    {
        try {
            if (!empty($data['email'])) {
                $email = trim($data['email']);
                if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 50) {
                    return [
                        'code' => 400,
                        'body' => [
                            'status' => 'error',
                            'message' => 'E-mail inválido ou maior que 50 caracteres'
                        ]
                    ];
                }
                $account = $this->client->getByEmail($email);
                if (!$account) {
                    return [
                        'code' => 404,
                        'body' => [
                            'status' => 'error',
                            'message' => 'E-mail não encontrado'
                        ]
                    ];
                }
                $code = $account['code'];
                $name = $account['name'];
            } else {
                $userData = $this->authenticate();
                if (isset($userData['body']['status']) && $userData['body']['status'] == 'error') {
                    return [
                        'code' => 404,
                        'body' => [
                            'status' => 'error',
                            'message' => 'Nenhum e-mail para recuperação foi informado'
                        ]
                    ];
                }
                $id = $userData['sub'];
                $account = $this->client->getById($id);
                if (!$account) {
                    return [
                        'code' => 404,
                        'body' => [
                            'status' => 'error',
                            'message' => 'Conta não encontrada'
                        ]
                    ];
                }
                $email = $account['email'];
                $code = $account['code'];
                $name = $account['name'];
            }

            $recoveryScreen = trim($data['recoveryScreen']);

            $subject = "Recuperar Senha";
            $HTMLbody = "Clique para recuperar sua senha: <a href='$recoveryScreen?code=$code'>Recuperar Senha</a>";
            $textBody = "Acesse o link: $recoveryScreen?code=$code";
            $sendEmail = $this->emailSender->sendEmail($email, $name, $subject, $HTMLbody, $textBody);

            return [
                'code' => $sendEmail ? 200 : 500,
                'body' => [
                    'status' => $sendEmail ? 'success' : 'error',
                    'message' => $sendEmail ?
                        ['validationEmail' => "Um e-mail de recuperação foi enviado para $email", 'email' => $email]
                        : 'Erro ao enviar e-mail de recuperação'
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

    public function registerAppointment($data)
    {
        
    }
}
?>
