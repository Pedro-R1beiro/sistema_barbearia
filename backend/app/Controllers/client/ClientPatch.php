<?php 

namespace App\Controllers\Client;

use App\Database\Database;

use App\Models\Appointment;
use App\Models\Client;

use App\Actions\Client\Patch\CancelAppointment;
use App\Actions\Client\Patch\ChangeInfo;
use App\Actions\Client\Patch\ChangePassword;
use App\Actions\Client\Patch\ResetPassword;
use App\Actions\Client\Patch\ValidateEmail;

use App\Services\Authenticate;

class ClientPatch{
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

    public function cancelAppointment($data)
    {
        $authResult = $this->auth->ensureAuth();

        if (!isset($authResult['id'])) {
            return $authResult;
        }

        $idUser = $authResult['id'];

        $cancelAppointment = new CancelAppointment($this->appo);
        return $cancelAppointment->handle($data, $idUser);
    }

    public function changeInfo($data)
    {
        $authResult = $this->auth->ensureAuth();

        if (!isset($authResult['id'])) {
            return $authResult;
        }

        $idUser = $authResult['id'];

        $changeInfo = new ChangeInfo($this->client);
        return $changeInfo->handle($data, $idUser);
    }

    public function changePassword($data)
    {
        $authResult = $this->auth->ensureAuth();

        if (!isset($authResult['id'])) {
            return $authResult;
        }

        $idUser = $authResult['id'];

        $changePassword = new ChangePassword($this->client);
        return $changePassword->handle($data, $idUser);
    }

    public function resetPassword($data)
    {
        $resetPassword = new ResetPassword($this->client);
        return $resetPassword->handle($data);
    }

    public function validateEmail($data)
    {
        $validateEmail = new validateEmail($this->client);
        return $validateEmail->handle($data);
    }
}

?>