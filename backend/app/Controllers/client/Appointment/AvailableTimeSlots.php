<?php

namespace App\Controllers\Client\Appointment;

use App\Models\Service;
use App\Models\Professional;
use App\Models\Vacation;
use App\Models\DayOff;
use App\Models\Availability;
use App\Models\Appointment;

use DateTime;
use DateInterval;
use Exception;

class AvailableTimeSlots
{
    public $service;
    public $prof;
    public $vacat;
    public $dayOff;
    public $avail;
    public $appo;

    public function __construct(Service $service, Professional $prof, Vacation $vacat, DayOff $dayOff, Availability $avail, Appointment $appo)
    {
        $this->service = $service;
        $this->prof = $prof;
        $this->vacat = $vacat;
        $this->dayOff = $dayOff;
        $this->avail = $avail;
        $this->appo = $appo;
    }

    public function handle($data)
    {
        try {
            $id = $data['id_user'] ?? null;

            if (empty($data['date']) || empty($data['service'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Data e/ou serviço(s) não especificado(s)'
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

            date_default_timezone_set('America/Sao_Paulo');
            $today = date('Y-m-d');
            $now = date('H:i:s');

            if ($data['date'] < $today) {
                return [
                    'code' => 422,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Data informada anterior a ' . $today . ' (Hoje)'
                    ]
                ];
            }

            $duration = 0;

            if (is_array($data['service'])) {
                $services = $data['service'];
            } elseif (is_string($data['service'])) {
                $services = explode(',', $data['service']);
            } else {
                $services = $data['service'];
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

            $professionals = $this->prof->get();
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

            $timeSlots = [];

            foreach ($professionals as $indice => $row) {
                $_isOnVacation = $this->vacat->isOnVacation($row['id'], $date);
                $_isOnDayOff = $this->dayOff->isOnDayOff($row['id'], $date);
                $_availabilities = $this->avail->getByProfessional($row['id'], $dayWeek);

                $timeSlots[$indice] = [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'email' => $row['email'],
                    'phone' => $row['phone'],
                    'status' => 'fully_booked',
                    'timeSlot' => []
                ];

                if ($_isOnVacation) {
                    $timeSlots[$indice]['status'] = 'on_vacation';
                    continue;
                }
                if ($_isOnDayOff) {
                    $timeSlots[$indice]['status'] = 'day_off';
                    continue;
                }
                if (!$_availabilities || count($_availabilities) <= 0) {
                    $timeSlots[$indice]['status'] = 'not_working';
                    continue;
                }

                $defaultRange = new DateInterval('PT30M');

                foreach ($_availabilities as $_availability) {
                    if (!isset($_availability['startTime'], $_availability['endTime'])) {
                        continue;
                    }

                    $startTime = new DateTime($_availability['startTime']);
                    $endTime = new DateTime($_availability['endTime']);
                    $currentTime = clone $startTime;

                    $startBreak = null;
                    $endBreak = null;

                    if ($_availability['break'] == 1 && !empty($_availability['startBreak']) && !empty($_availability['endBreak'])) {
                        $startBreak = new DateTime($_availability['startBreak']);
                        $endBreak = new DateTime($_availability['endBreak']);
                    }

                    while ($currentTime < $endTime) {
                        if ($data['date'] == $today && $currentTime->format('H:i:s') <= $now) {
                            $currentTime->add($defaultRange);
                            continue;
                        }
                        $isOnBreak = false;
                        if ($startBreak && $endBreak) {
                            $isOnBreak = ($currentTime >= $startBreak && $currentTime < $endBreak);
                        }

                        if (!$isOnBreak) {
                            $periodEnd = clone $currentTime;
                            $periodEnd->add(new DateInterval('PT' . $duration . 'M'));

                            if ($periodEnd > $endTime) {
                                break;
                            }

                            $isAppointment = $this->appo->isOnAppointment($date, $row['id'], $currentTime->format('H:i:s'), $periodEnd->format('H:i:s'));
                            if (!$isAppointment || count($isAppointment) === 0) {
                                if ($timeSlots[$indice]['status'] != 'available') {
                                    $timeSlots[$indice]['status'] = 'available';
                                }
                                $timeSlots[$indice]['timeSlot'][] = $currentTime->format('H:i');
                            }
                        }

                        $currentTime->add($defaultRange);
                    }
                }
            }

            return [
                'code' => 200,
                'body' => [
                    'status' => 'success',
                    'message' => $timeSlots
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
