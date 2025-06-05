<?php

require_once __DIR__ . '/../../bd.php';
include_once __DIR__ . '/includeClasses.php';

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
        
    }

    public function logout()
    {
        
    }

    public function signup($data)
    {
        
    }

    public function sendRecoveryEmail($data)
    {
        
    }

    public function registerAppointment($data)
    {

    }
}
