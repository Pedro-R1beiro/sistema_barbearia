<?php

namespace App\Services;

use App\Models\Client;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Authenticate
{
    private $key;
    private $cookieName;

    public function __construct(string $type)
    {
        $this->key = $_ENV['TOKEN_KEY'];
        $this->cookieName = 'auth_token_' . $type;
    }

    private function getUser()
    {
        if (!isset($_COOKIE[$this->cookieName])) {
            return null;
        }

        try {
            $decoded = JWT::decode($_COOKIE[$this->cookieName], new Key($this->key, 'HS256'));
            return (array) $decoded;
        } catch (Exception $e) {
            return null;
        }
    }

    public function ensureAuth()
    {
        $unauthorized = [
            'code' => 401,
            'body' => [
                'status' => 'error',
                'message' => 'UNAUTHORIZED'
            ]
        ];

        $user = $this->getUser();
        if (!$user) return $unauthorized;

        $client = new Client;
        $account = $client->getByEmail($user['email']);
        if (!$account) {
            $this->inspireToken();
            return $unauthorized;
        }

        if (!password_verify($user['password'], $account['password'])) {
            $this->inspireToken();
            return $unauthorized;
        }

        return [
            'id' => $user['id'],
            'code' => $user['code']
        ];
    }

    public function generateToken($id, $code, $email, $password, $duration = 7)
    {
        try {
            $payload = [
                'id' => $id,
                'code' => $code,
                'email' => $email,
                'password' => $password,
                'iat' => time(),
                'exp' => time() + (60 * 60 * 24 * $duration)
            ];
            $jwt = JWT::encode($payload, $this->key, 'HS256');
            setcookie($this->cookieName, $jwt, [
                'expires' => time() + (60 * 60 * 24 * $duration),
                'path' => '/',
                'httponly' => true,
                'secure' => false,
                'samesite' => 'Lax'
            ]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function inspireToken()
    {
        try {
            setcookie($this->cookieName, '', [
                'expires' => time() - 3600,
                'path' => '/',
                'httponly' => true,
                'secure' => true,
                'samesite' => 'Lax'
            ]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
