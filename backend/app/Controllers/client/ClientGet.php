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

use App\Actions\Client\Get\AccountInformation;
use App\Actions\Client\Get\AvailableTimeSlots;
use App\Actions\Client\Get\GetAppointment;
use App\Actions\Client\Get\GetServices;

use App\Services\Authenticate;

class ClientGet
{
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
    }

    public function availableTimeSlots($data)
    {
        $authResult = $this->auth->ensureAuth();

        if (!isset($authResult['id'])) {
            return $authResult;
        }

        $idUser = $authResult['id'];

        $availableTimeSlots = new AvailableTimeSlots(
            $this->service,
            $this->prof,
            $this->vacat,
            $this->dayOff,
            $this->avail,
            $this->appo
        );
        return $availableTimeSlots->handle($data, $idUser);
    }

    public function getAppointment($data = null)
    {
        $authResult = $this->auth->ensureAuth();

        if (!isset($authResult['id'])) {
            return $authResult;
        }

        $idUser = $authResult['id'];

        $getAppointment = new GetAppointment($this->appo, $this->appoService);
        return $getAppointment->handle($idUser);
    }

    public function getServices()
    {
        $authResult = $this->auth->ensureAuth();

        if (!isset($authResult['id'])) {
            return $authResult;
        }

        $getServices = new GetServices($this->service);
        return $getServices->handle();
    }

    public function accountInformation() 
    {
        $authResult = $this->auth->ensureAuth();

        if (!isset($authResult['id'])) {
            return $authResult;
        }

        $idUser = $authResult['id'];

        $accountInfo = new AccountInformation($this->client);
        return $accountInfo->handle($idUser);
    }
}
