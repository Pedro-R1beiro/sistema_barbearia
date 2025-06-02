<?php

require_once __DIR__ . '/../../bd.php';
require_once __DIR__ . '/../../classes/client.php';
require_once __DIR__ . '/../../classes/service.php';
require_once __DIR__ . '/../../classes/appointment.php';
require_once __DIR__ . '/../../classes/professional.php';
require_once __DIR__ . '/../../classes/vacation.php';
require_once __DIR__ . '/../../classes/dayOff.php';
require_once __DIR__ . '/../../classes/availability.php';
require_once __DIR__ . '/../../email/emailSender.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ClientPost
{
    public $conn;
    public $client;
    public $service;
    public $appo;
    public $prof;
    public $vacat;
    public $dayOff;
    public $avail;
    public $emailSender;

    public function __construct()
    {
        $bd = new Database;
        $this->conn = $bd->connect();
        $this->client = new Client($this->conn);
        $this->service = new Service($this->conn);
        $this->appo = new Appointment($this->conn);
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

    public function login($data)
    {
        try {
            if (empty($data['email']) || empty($data['password'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Email e senha são obrigatórios'
                    ]
                ];
            }

            $email = trim($data['email']);
            $password = trim($data['password']);

            if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8 || strlen($email) > 50) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Email inválido e/ou senha deve ter pelo menos 8 caracteres'
                    ]
                ];
            }

            $account = $this->client->getByEmail($email);
            if (!$account || !password_verify($password, $account['password'])) {
                return [
                    'code' => 401,
                    'body' => [
                        'status' => 'error',
                        'message' => 'E-mail ou senha incorretos'
                    ]
                ];
            }

            if ($account['verified'] == 0) {
                return [
                    'code' => 401,
                    'body' => [
                        'status' => 'error',
                        'message' => 'E-mail não verificado'
                    ]
                ];
            }

            $key = 'qwe1!rty2@uiop3asd4$fgh5%jklç6';
            $payload = [
                'sub' => $account['id'],
                'code' => $account['code'],
                'iat' => time(),
                'exp' => time() + (60 * 60 * 24 * 7)
            ];
            $jwt = JWT::encode($payload, $key, 'HS256');
            setcookie('auth_token', $jwt, [
                'expires' => time() + (60 * 60 * 24 * 7),
                'path' => '/',
                'httponly' => true,
                'secure' => true,
                'samesite' => 'Lax'
            ]);

            return [
                'code' => 200,
                'body' => [
                    'status' => 'success',
                    'message' => [
                        'email' => $account['email']
                    ]
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

    public function logout()
    {
        try {
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
                    'message' => 'Deslogado com sucesso'
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

    public function signup($data)
    {
        try {
            if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['phone']) || empty($data['validationScreen'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Dados Inválidos'
                    ]
                ];
            }

            $name = trim($data['name']);
            $email = trim($data['email']);
            $password = trim($data['password']);
            $phone = trim($data['phone']);
            $validationScreen = trim($data['validationScreen']);

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'E-mail inválido'
                    ]
                ];
            }

            if (strlen($email) > 50 || strlen($password) < 8 || strlen($password) > 30 || strlen($name) < 3 || strlen($name) > 30) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Tamanho dos dados inválido.'
                    ]
                ];
            }

            $account = $this->client->getByEmail($email);
            if ($account && count($account) > 0) {
                return [
                    'code' => 409,
                    'body' => [
                        'status' => 'error',
                        'message' => 'E-mail já cadastrado'
                    ]
                ];
            }

            $code = $this->client->post($name, $email, $password, $phone);
            if (!$code) {
                return [
                    'code' => 500,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Erro ao criar conta'
                    ]
                ];
            }

            $subject = "Validar Email";
            $HTMLbody = "Para validar seu e-mail, clique no link: <a href='$validationScreen?code=$code'>Validar E-mail</a>";
            $textBody = "Para validar seu e-mail, acesse: $validationScreen?code=$code";
            $sendEmail = $this->emailSender->sendEmail($email, $name, $subject, $HTMLbody, $textBody);

            return [
                'code' => $sendEmail ? 201 : 200,
                'body' => [
                    'status' => 'success',
                    'message' => [
                        'validationEmail' => ($sendEmail ? 'Um e-mail de validação foi enviado' : 'Erro ao enviar e-mail de validação') . " para $email",
                        'email' => $email
                    ]
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

    public function sendRecoveryEmail($data)
    {
        try {
            if (!empty($data['email'])) {
                $email = trim($data['email']);
                if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 50) {
                    return [
                        'code' => 400,
                        'body' => [
                            'status' => 'error',
                            'message' => 'E-mail inválido ou maior que 50 caracteres'
                        ]
                    ];
                }
                $account = $this->client->getByEmail($email);
                if (!$account) {
                    return [
                        'code' => 404,
                        'body' => [
                            'status' => 'error',
                            'message' => 'E-mail não encontrado'
                        ]
                    ];
                }
                $code = $account['code'];
                $name = $account['name'];
            } else {
                $userData = $this->authenticate();
                if (isset($userData['body']['status']) && $userData['body']['status'] == 'error') {
                    return [
                        'code' => 404,
                        'body' => [
                            'status' => 'error',
                            'message' => 'Nenhum e-mail para recuperação foi informado'
                        ]
                    ];
                }
                $id = $userData['sub'];
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
                $email = $account['email'];
                $code = $account['code'];
                $name = $account['name'];
            }

            $recoveryScreen = trim($data['recoveryScreen']);

            $subject = "Recuperar Senha";
            $HTMLbody = "Clique para recuperar sua senha: <a href='$recoveryScreen?code=$code'>Recuperar Senha</a>";
            $textBody = "Acesse o link: $recoveryScreen?code=$code";
            $sendEmail = $this->emailSender->sendEmail($email, $name, $subject, $HTMLbody, $textBody);

            return [
                'code' => $sendEmail ? 200 : 500,
                'body' => [
                    'status' => $sendEmail ? 'success' : 'error',
                    'message' => $sendEmail ?
                        ['validationEmail' => "Um e-mail de recuperação foi enviado para $email", 'email' => $email]
                        : 'Erro ao enviar e-mail de recuperação'
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

    public function registerAppointment($data)
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
