<?php

require_once __DIR__ . '/../bd.php';
require_once __DIR__ . '/../classes/availability.php';
require_once __DIR__ . '/../classes/client.php';
require_once __DIR__ . '/../classes/dayOff.php';
require_once __DIR__ . '/../classes/professional.php';
require_once __DIR__ . '/../classes/scheduling.php';
require_once __DIR__ . '/../classes/vacation.php';

class ClientController
{
    public $conn;

    public $client;
    public $prof;
    public $avai;
    public $dayOff;
    public $vac;
    public $sche;

    public function __construct()
    {
        $bd = new Database;
        $this->conn = $bd->connect();

        $this->client = new Client($this->conn);
        $this->prof = new Professional($this->conn);
        $this->avai = new Availability($this->conn);
        $this->dayOff = new DayOff($this->conn);
        $this->vac = new Vacation($this->conn);
        $this->sche = new Scheduling($this->conn);
    }

    public function login($data)
    {
        if (empty($data['email']) || empty($data['password'])) {
            return ['status' => 'error', 'message' => 'Email e senha obrigatórios'];
        }

        $email = trim($data['email']);
        $password = trim($data['password']);

        $account = $this->client->getByEmail($email);
        if ($account && count($account) > 0) {
            if (password_verify($password, $account['password'])) {
                return [
                    'status' => 'sucess',
                    'message' => $account
                ];
            } else {
                return [
                    'status' => 'error',
                    'message' => 'senha incorreta'
                ];
            }
        } else {
            return [
                'status' => 'error',
                'message' => 'email inexistente'
            ];
        }
    }

    public function signup($data)
    {
        if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['phone'])) {
            return ['status' => 'error', 'message' => 'Dados Insuficientes'];
        }

        $name = trim($data['name']);
        $email = trim($data['email']);
        $password = trim($data['password']);
        $phone = trim($data['phone']);

        $account = $this->client->getByEmail($email);
        if (!$account || count($account) <= 0) {
            if ($this->client->post($name, $email, $password, $phone)) {
                return [
                    'status' => 'sucess',
                    'message' => $email
                ];
            } else {
                return [
                    'status' => 'error',
                    'message' => 'erro ao registrar no banco de dados'
                ];
            }
        } else {
            return [
                'status' => 'error',
                'message' => 'e-mail já cadastrado'
            ];
        }
    }
}
