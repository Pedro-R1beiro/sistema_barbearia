<?php 

namespace App\Controllers\Client;

use App\Controllers\Client\Auth\ResetPassword;
use App\Controllers\Client\Auth\ValidateEmail;
use App\Controllers\Client\Auth\Login;
use App\Controllers\Client\Auth\Logout;
use App\Controllers\Client\Auth\SendRecoveryEmail;
use App\Controllers\Client\Auth\Signup;

class AuthController extends ClienteController {
    public function resetPassword($data)
    {
        $resetPassword = new ResetPassword($this->client);
        return $resetPassword->handle($data);
    }

    public function validateEmail($data)
    {
        $validateEmail = new ValidateEmail($this->client);
        return $validateEmail->handle($data);
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

    public function sendRecoveryEmail($data)
    {
        $sendRecoveryEmail = new SendRecoveryEmail($this->client, $this->emailSender);
        return $sendRecoveryEmail->handle($data);
    }
}

?>