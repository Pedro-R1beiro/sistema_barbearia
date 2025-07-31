<?php 

namespace App\Actions\Client\Patch;

use App\Models\Appointment;

use Exception;

class CancelAppointment {
    public $appo;

    public function __construct(Appointment $appo)
    {
        $this->appo = $appo;
    }

    public function handle($data, $idUser)
    {
        try {
            $idClient = $idUser;

            if (empty($data['id']) || !is_numeric(trim($data['id']))) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Id do agendamento inválido'
                    ]
                ];
            }

            $id = trim($data['id']);
            $appointment = $this->appo->getById($id);
            if (!$appointment) {
                return [
                    'code' => 404,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Agendamento não encontrado'
                    ]
                ];
            }

            if ($appointment['idClient'] != $idClient) {
                return [
                    'code' => 403,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Você não tem permissão para excluir este agendamento'
                    ]
                ];
            }

            date_default_timezone_set('America/Sao_Paulo');
            $today = date('Y-m-d');
            $now = date('H:i:s');

            if ($appointment['date'] < $today || ($appointment['date'] == $today && $appointment['startTime'] <= $now)) {
                return [
                    'code' => 422,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Este agendamento já começou ou está no passado e não pode ser cancelado'
                    ]
                ];
            }
            if ($appointment['status'] == "canceled") {
                return [
                    'code' => 422,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Este agendamento já foi cancelado'
                    ]
                ];
            }

            if ($this->appo->patch($id, "canceled")) {
                return [
                    'code' => 204,
                    'body' => [
                        'status' => 'success',
                        'message' => 'Agendamento cancelado'
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

?>