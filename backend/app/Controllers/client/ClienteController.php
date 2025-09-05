<?php 

namespace App\Controllers\Client;

use App\Models\Appointment;
use App\Models\AppointmentService;
use App\Models\Availability;
use App\Models\Client;
use App\Models\DayOff;
use App\Models\Professional;
use App\Models\Service;
use App\Models\Vacation;
use App\Services\Authenticate;
use App\Services\EmailSender;

class ClienteController {
    public $client;
    public $auth;
    public $emailSender;
    public $appo;
    public $appoService;
    public $avail;
    public $dayOff;
    public $prof;
    public $service;
    public $vacat;
    
    public function __construct()
    {
        $this->client = new Client();
        $this->auth = new Authenticate('client');
        $this->emailSender = new EmailSender();
        $this->appo = new Appointment();
        $this->appoService = new AppointmentService();
        $this->avail = new Availability();
        $this->dayOff = new DayOff();
        $this->prof = new Professional();
        $this->service = new Service();
        $this->vacat = new Vacation();
    }
}

?>