<?php

require_once __DIR__ . '/../../bd.php';
require_once __DIR__ . '/../../classes/client.php';
require_once __DIR__ . '/../../classes/appointment.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ClientPatch
{
    public $conn;
    public $client;
    public $appo;
    public $emailSender;

    public function __construct()
    {
        $bd = new Database;
        $this->conn = $bd->connect();
        $this->client = new Client($this->conn);
        $this->appo = new Appointment($this->conn);
        $this->emailSender = new EmailSender;
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

    public function validateEmail($data)
    {
        try {
            if (empty($data['code'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Sem código para verificar'
                    ]
                ];
            }

            $code = trim($data['code']);
            $account = $this->client->getByCode($code);

            if (!$account) {
                return [
                    'code' => 404,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Nenhuma conta encontrada com este código'
                    ]
                ];
            }

            if ($account['verified'] == 1) {
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => 'Este e-mail já foi verificado'
                    ]
                ];
            }

            $value = ['verified' => 1];
            $validateEmail = $this->client->patch($account['id'], $value);

            if ($validateEmail) {
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => 'E-mail validado com sucesso'
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
                    'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
                ]
            ];
        }
    }

    public function changeInfo($data)
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
                        'message' => 'Nenhuma conta encontrada com este Id'
                    ]
                ];
            }

            if (empty($data['name']) && empty($data['email']) && empty($data['phone'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Nenhum dado novo foi informado'
                    ]
                ];
            }

            $name = !empty($data['name']) ? trim($data['name']) : null;
            $email = !empty($data['email']) ? trim($data['email']) : null;
            $phone = !empty($data['phone']) ? trim($data['phone']) : null;

            if ($name !== null && (strlen($name) < 3 || strlen($name) > 30)) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Nome deve conter entre 3 e 30 caracteres'
                    ]
                ];
            }

            if ($email !== null && (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 50)) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Email inválido ou maior que 50 caracteres'
                    ]
                ];
            }

            if (empty($data['password'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Senha atual não foi informada'
                    ]
                ];
            }

            $password = trim($data['password']);
            if (!password_verify($password, $account['password'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Senha incorreta'
                    ]
                ];
            }

            $values = [
                'name' => $name,
                'email' => $email,
                'phone' => $phone
            ];

            if ($this->client->patch($id, $values)) {
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => 'Dados alterados com sucesso'
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
                    'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
                ]
            ];
        }
    }

    public function changePassword($data)
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
                        'message' => 'Nenhuma conta encontrada com este Id'
                    ]
                ];
            }

            if (empty($data['currentPassword']) || empty($data['newPassword'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Informe a nova senha e a senha atual para continuar'
                    ]
                ];
            }

            $currentPass = trim($data['currentPassword']);
            $newPass = trim($data['newPassword']);

            if (strlen($currentPass) < 8 || strlen($currentPass) > 30 || strlen($newPass) < 8 || strlen($newPass) > 30) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'As senhas devem conter entre 8 e 30 caracteres'
                    ]
                ];
            }

            if (!password_verify($currentPass, $account['password'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Senha incorreta'
                    ]
                ];
            }

            $value = ['password' => $newPass];

            if ($this->client->patch($id, $value)) {
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => 'Senha alterada com sucesso'
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
                    'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
                ]
            ];
        }
    }

    public function resetPassword($data)
    {
        try {
            if (empty($data['code']) || empty($data['newPassword'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Dados necessários não foram informados'
                    ]
                ];
            }

            $code = trim($data['code']);
            $newPass = trim($data['newPassword']);

            $account = $this->client->getByCode($code);
            if (!$account) {
                return [
                    'code' => 404,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Nenhuma conta encontrada com este código'
                    ]
                ];
            }

            if (password_verify($newPass, $account['password'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'A nova senha não pode ser igual à atual'
                    ]
                ];
            }

            $value = ['password' => $newPass];

            if ($this->client->patch($account['id'], $value)) {
                return [
                    'code' => 200,
                    'body' => [
                        'status' => 'success',
                        'message' => 'Senha alterada com sucesso'
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
                    'message' => 'Erro ao realizar seu pedido, tente novamente mais tarde'
                ]
            ];
        }
    }

    public function cancelAppointment($data)
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
                        'message' => 'Este agendamento já começou ou está no passado e não pode ser cancelado'
                    ]
                ];
            }
            if ($appointment['status'] == "canceled") {
                return [
                    'code' => 422,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Este agendamento já foi cancelado'
                    ]
                ];
            }

            if ($this->appo->patch($id, "canceled")) {
                return [
                    'code' => 204,
                    'body' => [
                        'status' => 'success',
                        'message' => 'Agendamento cancelado'
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
