<?php

namespace App\Controllers\Client\Auth;

use App\Models\Client;
use App\Services\Authenticate;

use Exception;

class Login
{
    public $client;
    public $auth;

    public function __construct(Client $client, Authenticate $auth)
    {
        $this->client = $client;
        $this->auth = $auth;
    }

    public function handle($data)
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

            // gerar token
            $this->auth->generateToken($account['id'], $account['code']);
            return [
                'code' => 200,
                'body' => [
                    'status' => 'success',
                    'message' =>
                    'Login realizado com sucesso'
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
