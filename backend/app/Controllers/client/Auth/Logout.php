<?php 

namespace App\Controllers\Client\Auth;

use App\Services\Authenticate;
use Exception;

class Logout {
    public $auth;

    public function __construct(Authenticate $auth)
    {
        $this->auth = $auth;
    }

    public function handle() 
    {
        try {
            $this->auth->inspireToken();

            return [
                'code' => 204,
                'body' => [
                    'status' => 'success',
                    'message' => 'Deslogado com sucesso'
                ]
            ];
        } catch (Exception $e) {
            return [
                'code' => 500,
                'body' => [
                    'status' => 'error',
                    'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
                ]
            ];
        }
    }
}

?>