<?php 

namespace App\Controllers\Client\Account;

use App\Models\Client;

use Exception;

class ChangeInfo {
    public $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function handle($data) 
    {
        try {
            $id = $data['id_user'] ?? null;
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

            if ($name !== null && (strlen($name) < 3 || strlen($name) > 30)) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Nome deve conter entre 3 e 30 caracteres'
                    ]
                ];
            }

            if ($email !== null && (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 50)) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Email inválido ou maior que 50 caracteres'
                    ]
                ];
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