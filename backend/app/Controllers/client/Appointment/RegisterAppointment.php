<?php

namespace App\Controllers\Client\Appointment;

use App\Models\Appointment;
use App\Models\AppointmentService;
use App\Models\Availability;
use App\Models\DayOff;
use App\Models\Vacation;
use App\Models\Service;
use App\Models\Professional;

use DateTime;
use DateInterval;
use Exception;

class RegisterAppointment
{
    public $service;
    public $prof;
    public $vacat;
    public $dayOff;
    public $avail;
    public $appo;
    public $appoService;

    public function __construct(Service $service, Professional $prof, Vacation $vacat, DayOff $dayOff, Availability $avail, Appointment $appo, AppointmentService $appoService)
    {
        $this->service = $service;
        $this->prof = $prof;
        $this->vacat = $vacat;
        $this->dayOff = $dayOff;
        $this->avail = $avail;
        $this->appo = $appo;
        $this->appoService = $appoService;
    }

    public function handle($data)
    {
        try {
            $id = $data['id_user'] ?? null;
            
            if (empty($data['date']) || empty($data['service'] || empty($data['idProfessional']) || empty($data['startTime']))) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Dados insunficientes'
                    ]
                ];
            }

            date_default_timezone_set('America/Sao_Paulo');
            $today = date('Y-m-d');
            $now = date('H:i:s');

            if ($data['date'] < $today || ($data['date'] == $today && $data['startTime'] <= $now)) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Não é possível agendar com uma data anterior a de hoje'
                    ]
                ];
            }

            if (!DateTime::createFromFormat('H:i', trim($data['startTime']))) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Formato de horário inválido'
                    ]
                ];
            }

            if (!DateTime::createFromFormat('Y-m-d', trim($data['date']))) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Formato de data inválido'
                    ]
                ];
            }

            if (!is_numeric($data['idProfessional'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Id do professional deve ser um número'
                    ]
                ];
            }

            $duration = 0;

            if (is_array($data['service'])) {
                $services = $data['service'];
            } elseif (is_string($data['service'])) {
                $services = explode(',', $data['service']);
            } else {
                $services = [$data['service']];
            }

            $services = array_unique(array_map('trim', $services));

            foreach ($services as $idService) {
                if (!is_numeric($idService)) {
                    return [
                        'code' => 400,
                        'body' => [
                            'status' => 'error',
                            'message' => 'ID de serviço inválido: deve ser numérico'
                        ]
                    ];
                }

                $_service = $this->service->getById($idService);
                if (!$_service || !isset($_service['duration'])) {
                    return [
                        'code' => 400,
                        'body' => [
                            'status' => 'error',
                            'message' => 'Um id de serviço informado não existe'
                        ]
                    ];
                }
                $duration += $_service['duration'];
            }

            if ($duration === 0) {
                return [
                    'code' => 500,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
                    ]
                ];
            }

            $professionals = $this->prof->getById($data['idProfessional']);
            if (!$professionals || count($professionals) <= 0) {
                return [
                    'code' => 500,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Nenhum profissional encontrado no banco de dados'
                    ]
                ];
            }

            $date = trim($data['date']);
            $dayWeek = date('w', strtotime($date));
            $idProfessional = trim($data['idProfessional']);
            $startTime = new DateTime(trim($data['startTime']));
            $endTime = clone $startTime;
            $endTime->add(new DateInterval('PT' . $duration . 'M'));

            $isOnVacation = $this->vacat->isOnVacation($idProfessional, $date);
            $isOnDayOff = $this->dayOff->isOnDayOff($idProfessional, $date);
            $availabilities = $this->avail->getByProfessional($idProfessional, $dayWeek);
            $isAppointment = $this->appo->isOnAppointment($date, $idProfessional, $startTime->format('H:i:s'), $endTime->format('H:i:s'));
            if (($isAppointment && count($isAppointment) > 0) || $isOnDayOff || $isOnVacation || (!$availabilities || count($availabilities) <= 0)) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Horário não disponível'
                    ]
                ];
            }

            $appointmentId = $this->appo->post($date, $startTime->format('H:i:s'), $endTime->format('H:i:s'), $idProfessional, $id);
            $appoServicesIds = [];

            foreach ($services as $_idService) {
                $result = $this->appoService->post($_idService, $appointmentId);

                if ($result === false) {
                    $this->appo->delete($appointmentId);
                    foreach ($appoServicesIds as $appoServicesId) {
                        $this->appoService->delete($appoServicesId);
                    }
                    return [
                        'code' => 500,
                        'body' => [
                            'status' => 'error',
                            'message' => 'Erro ao agendar um dos serviços. Todos os agendamentos foram cancelados.'
                        ]
                    ];
                }

                $appointmentIds[] = $result;
            }
            return [
                'code' => 201,
                'body' => [
                    'status' => 'success',
                    'message' => 'Agendamento criado com sucesso'
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
