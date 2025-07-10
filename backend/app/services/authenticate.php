<?php

namespace App\Services;

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

    public function getUser()
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
        $user = $this->getUser();

        if (!$user) {
            return [
                'code' => 401,
                'body' => [
                    'status' => 'error',
                    'message' => 'UNAUTHORIZED'
                ]
            ];
        }

        return $user;
    }

    public function generateToken($id, $code, $duration = 7)
    {
        try {
            $payload = [
                'id' => $id,
                'code' => $code,
                'iat' => time(),
                'exp' => time() + (60 * 60 * 24 * $duration)
            ];
            $jwt = JWT::encode($payload, $this->key, 'HS256');
            setcookie($this->cookieName, $jwt, [
                'expires' => time() + (60 * 60 * 24 * $duration),
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
