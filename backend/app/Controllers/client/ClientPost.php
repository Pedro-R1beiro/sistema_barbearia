<?php 

namespace App\Controllers\Client;

use App\Database\Database;

use App\Models\Appointment;
use App\Models\AppointmentService;
use App\Models\Availability;
use App\Models\Client;
use App\Models\DayOff;
use App\Models\Professional;
use App\Models\Service;
use App\Models\Vacation;

use App\Actions\Client\Post\Login;
use App\Actions\Client\Post\Logout;
use App\Actions\Client\Post\RegisterAppointment;
use App\Actions\Client\Post\SendRecoveryEmail;
use App\Actions\Client\Post\Signup;

use App\Services\Authenticate;
use App\Services\EmailSender;


class ClientPost {
    private $conn;

    private $appo;
    private $appoService;
    private $avail;
    private $client;
    private $dayOff;
    private $prof;
    private $service;
    private $vacat;

    private $auth;
    private $emailSender;

    public function __construct()
    {
        $bd = new Database();
        $this->conn = $bd->connect();

        $this->appo = new Appointment($this->conn);
        $this->appoService = new AppointmentService($this->conn);
        $this->avail = new Availability($this->conn);
        $this->client = new Client($this->conn);
        $this->dayOff = new DayOff($this->conn);
        $this->prof = new Professional($this->conn);
        $this->service = new Service($this->conn);
        $this->vacat = new Vacation($this->conn);

        $this->auth = new Authenticate('client');
        $this->emailSender = new EmailSender;
    }

    public function login($data)
    {
        $login = new Login($this->client, $this->auth);
        return $login->handle($data);
    }

    public function logout()
    {
        $logout = new Logout($this->auth);
        return $logout->handle();
    }

    public function signup($data)
    {
        $signup = new Signup($this->client, $this->emailSender);
        return $signup->handle($data);
    }

    public function registerAppointment($data)
    {
        $authResult = $this->auth->ensureAuth();

        if (!isset($authResult['id'])) {
            return $authResult;
        }

        $idUser = $authResult['id'];

        $registerAppointment = new RegisterAppointment(
            $this->service, 
            $this->prof, 
            $this->vacat, 
            $this->dayOff, 
            $this->avail, 
            $this->appo,
            $this->appoService);

        return $registerAppointment->handle($data, $idUser);
    }

    public function sendRecoveryEmail($data = null)
    {
        $authResult = $this->auth->ensureAuth();
        $idUser = !isset($authResult['id']) ? null : $authResult['id'];

        $sendRecoveryEmail = new SendRecoveryEmail($this->client, $this->emailSender);
        return $sendRecoveryEmail->handle($data, $idUser);
    }
}

?>