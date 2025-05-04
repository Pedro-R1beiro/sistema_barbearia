<?php 

require '../bd.php';
require '../classes/availability.php';
require '../classes/client.php';
require '../classes/dayOff.php';
require '../classes/professional.php';
require '../classes/scheduling.php';
require '../classes/vacation.php';

class ClientController 
{
    public $conn;
    public $client;
    public $dayOff;
    public $prof;
    public $sche;
    public $vac;

    public function __construct()
    {
        
    }
}