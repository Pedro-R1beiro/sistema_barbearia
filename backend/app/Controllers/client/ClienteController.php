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
use App\Services\Authenticate;
use App\Services\EmailSender;

class ClienteController {
    protected $conn;
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
        $db = new Database();
        $this->conn = $db->connect();
        $this->client = new Client($this->conn);
        $this->auth = new Authenticate('client');
        $this->emailSender = new EmailSender();
        $this->appo = new Appointment($this->conn);
        $this->appoService = new AppointmentService($this->conn);
        $this->avail = new Availability($this->conn);
        $this->dayOff = new DayOff($this->conn);
        $this->prof = new Professional($this->conn);
        $this->service = new Service($this->conn);
        $this->vacat = new Vacation($this->conn);
    }
}

?>