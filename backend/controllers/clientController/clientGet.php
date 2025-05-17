<?php

require_once __DIR__ . '/../../bd.php';
require_once __DIR__ . '/../../classes/appointment.php';
require_once __DIR__ . '/../../classes/service.php';
require_once __DIR__ . '/../../classes/professional.php';
require_once __DIR__ . '/../../classes/vacation.php';
require_once __DIR__ . '/../../classes/dayOff.php';
require_once __DIR__ . '/../../classes/availability.php';
require_once __DIR__ . '/../../email/emailSender.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ClientGet
{
    public $conn;

    public $appo;
    public $service;
    public $prof;
    public $vacat;
    public $dayOff;
    public $avail;

    public $emailSender;

    public function __construct()
    {
        $bd = new Database;
        $this->conn = $bd->connect();

        $this->appo = new Appointment($this->conn);
        $this->service = new Service($this->conn);
        $this->prof = new Professional($this->conn);
        $this->vacat = new Vacation($this->conn);
        $this->dayOff = new DayOff($this->conn);
        $this->avail = new Availability($this->conn);

        $this->emailSender = new EmailSender;
    }

    public function authenticate()
    {
        if (!isset($_COOKIE['auth_token'])) {
            return [
                'code' => 401,
                'body' => [
                    'status' => 'error',
                    'message' => 'Não autenticado'
                ]
            ];
        }

        $key = 'qwe1!rty2@uiop3asd4$fgh5%jklç6';

        try {
            $decoded = JWT::decode($_COOKIE['auth_token'], new Key($key, 'HS256'));
            return (array) $decoded;
        } catch (Exception $e) {
            return [
                'code' => 401,
                'body' => [
                    'status' => 'error',
                    'message' => 'Token inválido'
                ]
            ];
        }
    }

    public function getAppointment($data = null)
    {
        $userData = $this->authenticate();
        if (isset($userData['body']['status']) && $userData['body']['status'] == 'error') {
            return $userData;
        }
        $id = $userData['sub'];

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

        $appointment = $this->appo->get($filter, null, $id);
        if ($appointment) {
            return [
                'code' => 200,
                'body' => [
                    'status' => 'success',
                    'message' => $appointment
                ]
            ];
        }
        return [
            'code' => 404,
            'body' => [
                'status' => 'error',
                'message' => 'Nenhum agendamento foi encontrado'
            ]
        ];
    }

    public function getServices()
    {
        $userData = $this->authenticate();
        if (isset($userData['body']['status']) && $userData['body']['status'] == 'error') {
            return $userData;
        }

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
            'code' => 404,
            'body' => [
                'status' => 'error',
                'message' => 'Nenhum agendamento foi encontrado'
            ]
        ];
    }

    public function availableTimeSlots($data)
    {
        try {
            $userData = $this->authenticate();
            if (isset($userData['body']['status']) && $userData['body']['status'] == 'error') {
                return $userData;
            }
            $id = $userData['sub'];

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
                    'timeSlot' => []
                ];

                if ($_isOnVacation || $_isOnDayOff || !$_availabilities || count($_availabilities) <= 0) {
                    continue;
                }

                $defaultRange = new DateInterval('PT30M');

                foreach ($_availabilities as $_availability) {
                    if (!isset($_availability['startTime'], $_availability['endTime'])) {
                        continue;
                    }

                    $startTime = new DateTime($_availability['startTime']);
                    $endTime = new DateTime($_availability['endTime']);
                    $now = clone $startTime;

                    $startBreak = null;
                    $endBreak = null;

                    if ($_availability['break'] == 1 && !empty($_availability['startBreak']) && !empty($_availability['endBreak'])) {
                        $startBreak = new DateTime($_availability['startBreak']);
                        $endBreak = new DateTime($_availability['endBreak']);
                    }

                    while ($now < $endTime) {
                        $isOnBreak = false;
                        if ($startBreak && $endBreak) {
                            $isOnBreak = ($now >= $startBreak && $now < $endBreak);
                        }

                        if (!$isOnBreak) {
                            $periodEnd = clone $now;
                            $periodEnd->add(new DateInterval('PT' . $duration . 'M'));

                            if ($periodEnd > $endTime) {
                                break;
                            }

                            $isAppointment = $this->appo->isOnAppointment($date, $row['id'], $now->format('H:i:s'), $periodEnd->format('H:i:s'));
                            if (!$isAppointment || count($isAppointment) === 0) {
                                $timeSlots[$indice]['timeSlot'][] = $now->format('H:i');
                            }
                        }

                        $now->add($defaultRange);
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
