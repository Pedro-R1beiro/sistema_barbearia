<?php

require_once __DIR__ . '/../bd.php';
require_once __DIR__ . '/../classes/availability.php';
require_once __DIR__ . '/../classes/client.php';
require_once __DIR__ . '/../classes/dayOff.php';
require_once __DIR__ . '/../classes/professional.php';
require_once __DIR__ . '/../classes/scheduling.php';
require_once __DIR__ . '/../classes/vacation.php';
require_once __DIR__ . '/../email/emailSender.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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

        $key = getenv('JWT_SECRET');

        try {
            $decoded = JWT::decode($_COOKIE['auth_code'], new Key($key, 'HS256'));
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
        if (!$account || count($account) <= 0) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'E-mail ou senha incorretos'
                ]
            ];
        }
        if (!password_verify($password, $account['password'])) {
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

        $key = getenv('JWT_SECRET');
        $payload = [
            'sub' => $account['id'],
            'email' => $account['code'],
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24 * 7)
        ];
        $jwt = JWT::encode($payload, $key, 'HS256');
        setcookie('auth_code', $jwt, [
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
        if (!$code || empty($code)) {
            return [
                'code' => 500,
                'body' => [
                    'status' => 'error',
                    'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
                ]
            ];
        }
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

        if (!$account && count($account) <= 0) {
            return [
                'code' => 404,
                'body' => [
                    'status' => 'error',
                    'message' => 'Nenhuma conta encontrada com este código'
                ]
            ];
        }
        if ($account['verified'] == 1) {
            return [
                'code' => 200,
                'body' => [
                    'status' => 'success',
                    'message' => 'Este e-mail já foi verificado'
                ]
            ];
        }

        $value = [
            'verified' => 1
        ];
        $validateEmail = $this->client->patch($account['id'], $value);

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
                'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
            ]
        ];
    }

    public function delete()
    {
        $userData = $this->authenticate();
        if (isset($userData['body']['status']) && $userData['body']['status'] == 'error') {
            return $userData;
        }
        $id = $userData['sub'];

        $account = $this->client->getById($id);
        if (!$account || count($account) <= 0) {
            return [
                'code' => 404,
                'body' => [
                    'status' => 'error',
                    'message' => 'Nenhuma conta encontrada com este Id'
                ]
            ];
        }
        if ($this->client->delete($id)) {
            setcookie('auth_code', '', [
                'expires' => time() - 3600, // expira no passado
                'path' => '/',
                'httponly' => true,
                'secure' => true,
                'samesite' => 'Lax'
            ]);

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
                'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
            ]
        ];
    }

    public function changeInfo($data)
    {
        $userData = $this->authenticate();
        if (isset($userData['body']['status']) && $userData['body']['status'] == 'error') {
            return $userData;
        }
        $id = $userData['sub'];

        if (empty($data['name']) && empty($data['email']) && empty($data['phone'])) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Nenhum dado novo foi informado'
                ]
            ];
        }

        $name = !empty($data['name']) ? trim($data['name']) : null;
        $email = !empty($data['email']) ? trim($data['email']) : null;
        $phone = !empty($data['phone']) ? trim($data['phone']) : null;

        if ($name != null) {
            if (strlen($name) < 3 || strlen($name) > 30) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Nome deve conter entre 3 e 30 caracteres'
                    ]
                ];
            }
        }
        if ($email != null) {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 50) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Email inválido ou maior que 50 caracteres'
                    ]
                ];
            }
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
        $password = trim($data['password']);

        $account = $this->client->getById($id);
        if (!$account || !isset($account)) {
            return [
                'code' => 404,
                'body' => [
                    'status' => 'error',
                    'message' => 'Nenhuma conta encontrada com o id informado'
                ]
            ];
        }
        if (!password_verify($password, $account['password'])) {
            return [
                'code' => 400,
                'body' => [
                    'status' => 'error',
                    'message' => 'Senha incorreta'
                ]
            ];
        }

        $values = [
            'name' => $name,
            'email' => $email,
            'phone' => $phone
        ];
        if ($this->client->patch($id, $values)) {
            return [
                'code' => 200,
                'body' => [
                    'status' => 'success',
                    'message' => 'Dados alterados com sucesso'
                ]
            ];
        }
        return [
            'code' => 500,
            'body' => [
                'status' => 'error',
                'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
            ]
        ];
    }
}
