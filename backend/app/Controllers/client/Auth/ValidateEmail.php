<?php 

namespace App\Controllers\Client\Auth;

use App\Models\Client;

use Exception;

class ValidateEmail {
    public $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function handle($data)
    {
        try {
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

            if (!$account) {
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

            $value = ['verified' => 1];
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