<?php

class RegisterAppointment 
{
    private $service;
    private $prof;
    private $vacat;
    private $dayOff;
    private $avail;
    private $appo;

    public function __construct($service, $prof, $vacat, $avail, $appo)
    {
        
    }

    public function default($data)
    {
        try {
            $userData = $this->authenticate();
            if (isset($userData['body']['status']) && $userData['body']['status'] == 'error') {
                return $userData;
            }
            $id = $userData['sub']; {
                if (empty($data['date']) || empty($data['service'] || empty($data['idProfessional']) || empty($data['startTime']))) {
                    return [
                        'code' => 400,
                        'body' => [
                            'status' => 'error',
                            'message' => 'Dados insunficientes'
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
            $appointmentIds = []; // Array para armazenar os IDs dos agendamentos

            foreach ($services as $_idService) {
                $result = $this->appo->post($date, $startTime->format('H:i:s'), $endTime->format('H:i:s'), $_idService, $idProfessional, $id);

                if ($result === false) {
                    // Algo deu errado. Cancela todos os agendamentos anteriores.
                    foreach ($appointmentIds as $appointmentId) {
                        $this->appo->delete($appointmentId); // Supondo que você tenha um método de cancelamento
                    }
                    return [
                        'code' => 500, // Código de erro interno do servidor
                        'body' => [
                            'status' => 'error',
                            'message' => 'Erro ao agendar um dos serviços. Todos os agendamentos foram cancelados.'
                        ]
                    ];
                }

                $appointmentIds[] = $result;

                $rowService = $this->service->getById($_idService);
                $startTime = $endTime;
                $endTime->add(new DateInterval('PT' . $rowService['duration'] . 'M'));
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

?>