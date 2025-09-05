<?php 

namespace App\Controllers\Client\Auth;

use App\Models\Client;

use Exception;

class ResetPassword {
    public $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function handle($data)
    {
        try {
            if (empty($data['code']) || empty($data['newPassword'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Dados necessários não foram informados'
                    ]
                ];
            }

            $code = trim($data['code']);
            $newPass = trim($data['newPassword']);

            $account = $this->client->getByCode($code);
            if (!$account) {
                return [
                    'code' => 404,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Nenhuma conta encontrada com este código'
                    ]
                ];
            }

            if (password_verify($newPass, $account['password'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'A nova senha não pode ser igual à atual'
                    ]
                ];
            }

            $value = ['password' => $newPass];

            if ($this->client->patch($account['id'], $value)) {
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => 'Senha alterada com sucesso'
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

?>