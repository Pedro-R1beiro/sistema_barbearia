<?php

namespace App\Actions\Client\Get;

use App\Models\Service;

use Exception;  

class GetServices
{
    public $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    public function handle()
    {
        try {
            $services = $this->service->get();
            if ($services) {
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => $services
                    ]
                ];
            }
            return [
                'code' => 204,
                'body' => [
                    'status' => 'error',
                    'message' => 'Nenhum agendamento foi encontrado'
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
