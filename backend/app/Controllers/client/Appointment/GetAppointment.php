<?php

namespace App\Controllers\Client\Appointment;

use App\Models\Appointment;
use App\Models\AppointmentService;

use DateTime;
use Exception;

class GetAppointment
{
    public $appo;
    public $appoService;

    public function  __construct(Appointment $appo, AppointmentService $appoService)
    {
        $this->appo = $appo;
        $this->appoService = $appoService;
    }

    public function handle($data)
    {
        try {
            $id = $data['id_user'] ?? null;

            $filter = !empty($data['filter']) ? trim($data['filter']) : 'all';
            if (!in_array($filter, ['today', 'nearby', 'history', 'next', 'last', 'all'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Filtro inválido'
                    ]
                ];
            }

            $status = null;
            if (!empty($data['status'])) {
                if (is_array($data['status'])) {
                    $status = $data['status'];
                } else if (is_string($data['status'])) {
                    $status = explode(',', $data['status']);
                } else {
                    $status = $data['status'];
                }

                foreach ($status as $i) {
                    if (!in_array($i, ['canceled', 'booked', 'completed'])) {
                        return [
                            'code' => 400,
                            'body' => [
                                'status' => 'error',
                                'message' => "O filtro: '" . $i . "' não é um status válido (canceled, booked, completed)"
                            ]
                        ];
                    }
                }
            }

            $appointment = $this->appo->get($filter, $status, null, $id);
            if ($appointment) {
                foreach ($appointment as $_appo => $_value) {
                    $appointment[$_appo]['services'] = [];
                    $appointmentServices = $this->appoService->getBYAppointment($_value['id']);
                    foreach ($appointmentServices as $_service) {
                        $appointment[$_appo]['services'][] = [
                            'name' => $_service['serviceName'],
                            'price' => $_service['servicePrice']
                        ];
                    }
                    $_dateTime = new DateTime($appointment[$_appo]['created_at']);
                    $_dateTimeFormatted = $_dateTime->format('Y-m-d H:i:s');
                    list($_date, $_time) = explode(' ', $_dateTimeFormatted);
                    $appointment[$_appo]['created_at'] = [
                        'date' => $_date,
                        'time' => $_time
                    ];
                }
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => $appointment
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
