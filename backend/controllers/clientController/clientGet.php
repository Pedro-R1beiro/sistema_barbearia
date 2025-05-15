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

    public $emailSender;

    public function __construct()
    {
        $bd = new Database;
        $this->conn = $bd->connect();

        $this->appo = new Appointment($this->conn);
        $this->service = new Service($this->conn);
        $this->prof = new Professional($this->conn);

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

        // foreach ($professionals as $professionalRow) {
        //     $onVacation = $this->
        // }
    }
}
