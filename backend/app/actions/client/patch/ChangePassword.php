<?php 

namespace App\Actions\Client\Patch;

use App\Models\Client;

use Exception;

class ChangePassword {
    public $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function handle($data, $idUser)
    {
        try {
            $id = $idUser;
            $account = $this->client->getById($id);
            if (!$account) {
                return [
                    'code' => 404,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Nenhuma conta encontrada com este Id'
                    ]
                ];
            }

            if (empty($data['currentPassword']) || empty($data['newPassword'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Informe a nova senha e a senha atual para continuar'
                    ]
                ];
            }

            $currentPass = trim($data['currentPassword']);
            $newPass = trim($data['newPassword']);

            if (strlen($currentPass) < 8 || strlen($currentPass) > 30 || strlen($newPass) < 8 || strlen($newPass) > 30) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'As senhas devem conter entre 8 e 30 caracteres'
                    ]
                ];
            }

            if (!password_verify($currentPass, $account['password'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Senha incorreta'
                    ]
                ];
            }

            $value = ['password' => $newPass];

            if ($this->client->patch($id, $value)) {
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