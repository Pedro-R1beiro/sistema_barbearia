<?php

require_once __DIR__ . '/../../bd.php';
require_once __DIR__ . '/../../classes/client.php';
require_once __DIR__ . '/../../classes/appointment.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ClientDelete
{
    public $conn;

    public $client;
    public $appo;

    public function __construct()
    {
        try {
            $bd = new Database;
            $this->conn = $bd->connect();

            $this->client = new Client($this->conn);
            $this->appo = new Appointment($this->conn);
        } catch (Exception $e) {
            // Se falhar na conexão ou instanciamento, pode-se logar o erro se quiser
            $this->conn = null;
        }
    }

    public function authenticate()
    {
        if (!isset($_COOKIE['auth_token'])) {
            return [
                'code' => 401,
                'body' => [
                    'status' => 'error',
                    'message' => 'Não autenticado'
                ]
            ];
        }

        $key = 'qwe1!rty2@uiop3asd4$fgh5%jklç6';

        try {
            $decoded = JWT::decode($_COOKIE['auth_token'], new Key($key, 'HS256'));
            return (array) $decoded;
        } catch (Exception $e) {
            return [
                'code' => 401,
                'body' => [
                    'status' => 'error',
                    'message' => 'Token inválido'
                ]
            ];
        }
    }

    public function delete()
    {
        try {
            $userData = $this->authenticate();
            if (isset($userData['body']['status']) && $userData['body']['status'] == 'error') {
                return $userData;
            }
            $id = $userData['sub'];

            $account = $this->client->getById($id);
            if (!$account) {
                return [
                    'code' => 404,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Conta não encontrada'
                    ]
                ];
            }

            if ($this->client->delete($id)) {
                setcookie('auth_token', '', [
                    'expires' => time() - 3600,
                    'path' => '/',
                    'httponly' => true,
                    'secure' => true,
                    'samesite' => 'Lax'
                ]);

                return [
                    'code' => 204,
                    'body' => [
                        'status' => 'success',
                        'message' => 'Conta excluída com sucesso'
                    ]
                ];
            }

            return [
                'code' => 500,
                'body' => [
                    'status' => 'error',
                    'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
                ]
            ];
        } catch (Exception $e) {
            return [
                'code' => 500,
                'body' => [
                    'status' => 'error',
                    'message' => 'Erro inesperado, tente novamente mais tarde'
                ]
            ];
        }
    }

    public function deleteAppointment($data)
    {
        try {
            $userData = $this->authenticate();
            if (isset($userData['body']['status']) && $userData['body']['status'] == 'error') {
                return $userData;
            }
            $idClient = $userData['sub'];

            if (empty($data['id']) || !is_numeric(trim($data['id']))) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Id do agendamento inválido'
                    ]
                ];
            }

            $id = trim($data['id']);
            $appointment = $this->appo->getById($id);
            if (!$appointment) {
                return [
                    'code' => 404,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Agendamento não encontrado'
                    ]
                ];
            }

            if ($appointment['idClient'] != $idClient) {
                return [
                    'code' => 403,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Você não tem permissão para excluir este agendamento'
                    ]
                ];
            }

            date_default_timezone_set('America/Sao_Paulo');
            $today = date('Y-m-d');
            $now = date('H:i:s');

            if ($appointment['date'] < $today || ($appointment['date'] == $today && $appointment['startTime'] <= $now)) {
                return [
                    'code' => 422,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Este agendamento já começou ou está no passado e não pode ser excluído'
                    ]
                ];
            }

            if ($this->appo->delete($id)) {
                return [
                    'code' => 204,
                    'body' => [
                        'status' => 'success',
                        'message' => 'Agendamento excluído'
                    ]
                ];
            }

            return [
                'code' => 500,
                'body' => [
                    'status' => 'error',
                    'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
                ]
            ];
        } catch (Exception $e) {
            return [
                'code' => 500,
                'body' => [
                    'status' => 'error',
                    'message' => 'Erro inesperado, tente novamente mais tarde'
                ]
            ];
        }
    }
}

?>
