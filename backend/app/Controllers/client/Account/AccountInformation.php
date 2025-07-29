<?php

namespace App\Controllers\Client\Account;

use App\Models\Client;

use Exception;

class AccountInformation {

    public $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function handle($data)
    {
        try {
            $idUser = $data['id_user'] ?? null;

            $accountInfo = $this->client->getById($idUser);
            if ($accountInfo && count($accountInfo) > 0) {
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => [
                            'name' => $accountInfo['name'],
                            'email' => $accountInfo['email'],
                            'phone' => $accountInfo['phone']
                        ]
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