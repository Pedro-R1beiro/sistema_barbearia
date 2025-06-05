<?php

class Logout {
    public function __construct()
    {
        
    }

    public function default()
    {
        try {
            setcookie('auth_token', '', [
                'expires' => time() - 3600,
                'path' => '/',
                'httponly' => true,
                'secure' => true,
                'samesite' => 'Lax'
            ]);
            return [
                'code' => 204,
                'body' => [
                    'status' => 'success',
                    'message' => 'Deslogado com sucesso'
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