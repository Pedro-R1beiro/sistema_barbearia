<?php 

namespace App\Controllers\Client;

use App\Database\Database;

use App\Models\Appointment;
use App\Models\Client;

use App\Actions\Client\Delete\DeleteClient;

use App\Services\Authenticate;

class ClientDelete {
    private $conn;

    private $appo;
    private $client;

    private $auth;

    public function __construct()
    {
        $bd = new Database();
        $this->conn = $bd->connect();

        $this->appo = new Appointment($this->conn);
        $this->client = new Client($this->conn);

        $this->auth = new Authenticate('client');
    }

    public function delete()
    {
        $authResult = $this->auth->ensureAuth();

        if (!isset($authResult['id'])) {
            return $authResult;
        }

        $idUser = $authResult['id'];

        $delete = new DeleteClient($this->client, $this->appo);
        return $delete->handle($idUser);
    }
}

?>