<?php 

namespace App\Controllers\Client;

use App\Controllers\Client\Account\DeleteClient;
use App\Controllers\Client\Account\AccountInformation;
use App\Controllers\Client\Account\ChangeInfo;
use App\Controllers\Client\Account\ChangePassword;

class AccountController extends ClienteController {
    public function delete($data)
    {
        $delete = new DeleteClient($this->client, $this->appo);
        return $delete->handle($data);
    }

    public function accountInformation($data) 
    {
        $accountInfo = new AccountInformation($this->client);
        return $accountInfo->handle($data);
    }

    public function changeInfo($data)
    {
        $changeInfo = new ChangeInfo($this->client);
        return $changeInfo->handle($data);
    }

    public function changePassword($data)
    {
        $changePassword = new ChangePassword($this->client);
        return $changePassword->handle($data);
    }
}

?>