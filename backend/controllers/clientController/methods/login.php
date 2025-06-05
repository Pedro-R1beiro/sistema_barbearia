<?php

use Firebase\JWT\JWT;

class Login
{
    private $client;

    public function __construct($client) {
        
    }

    public function default($data)
    {
        $this->client = $client;

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
                    'code' => 401,
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
}
