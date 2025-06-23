<?php

namespace App\Actions\Client\Delete;

use App\Models\Client;
use App\Models\Appointment;

use Exception;

class DeleteClient
{
    public $client;
    public $appo;

    public function __construct(Client $client, Appointment $appo)
    {
        $this->client = $client;
        $this->appo = $appo;
    }

    public function handle($idUser)
    {
        try {
            $id = $idUser;

            $account = $this->client->getById($id);
            if (!$account) {
                return [
                    'code' => 404,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Conta não encontrada'
                    ]
                ];
            }
     
            $appoHistory = $this->appo->get('history', null, null, $id); // Busca agendamentos anteriores
            $appoNearby = $this->appo->get('nearby', null, null, $id);   // Busca agendamentos futuros

            // Exclui agendamentos futuros
            if ($appoNearby && count($appoNearby) > 0) {
                foreach ($appoNearby as $val) {
                    $this->appo->delete($val['id']);
                }
            }

            // Se houver agendamentos anteriores, inativa o cliente, senão, exclui completamente
            if ($appoHistory && count($appoHistory) > 0) {
                $delete = $this->client->disable($id);
            } else {
                $delete = $this->client->delete($id);
            }

            if ($delete) {
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
                        'message' => 'Conta excluída com sucesso'
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
                    'message' => 'Erro inesperado, tente novamente mais tarde'
                ]
            ];
        }
    }
}
