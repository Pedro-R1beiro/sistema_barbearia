<?php

namespace App\Controllers\Client\Auth;

use App\Models\Client;
use App\Services\EmailSender;
use Exception;

class SendRecoveryEmail
{
    public $client;
    public $emailSender;

    public function __construct(Client $client, EmailSender $emailSender)
    {
        $this->client = $client;
        $this->emailSender = $emailSender;
    }

    public function handle($data)
    {
        try {
            if (empty($data['email']) && empty($data['id_user'])) {
                return [
                    'code' => 400,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Nenhum e-mail para recuperação foi informado'
                    ]
                ];
            }

            if (!empty($data['email'])) {
                $email = trim($data['email']);
                if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 50) {
                    return [
                        'code' => 400,
                        'body' => [
                            'status' => 'error',
                            'message' => 'E-mail inválido ou maior que 50 caracteres'
                        ]
                    ];
                }
                $account = $this->client->getByEmail($email);
                if (!$account) {
                    return [
                        'code' => 404,
                        'body' => [
                            'status' => 'error',
                            'message' => 'E-mail não encontrado'
                        ]
                    ];
                }
                $code = $account['code'];
                $name = $account['name'];
            } else {
                $id = $data['id_user'] ?? null;
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
                $email = $account['email'];
                $code = $account['code'];
                $name = $account['name'];
            }

            $recoveryScreen = trim($data['recoveryScreen']);

            $subject = "Recuperar Senha";
            $HTMLbody = "Clique para recuperar sua senha: <a href='$recoveryScreen?code=$code'>Recuperar Senha</a>";
            $textBody = "Acesse o link: $recoveryScreen?code=$code";
            $sendEmail = $this->emailSender->sendEmail($email, $name, $subject, $HTMLbody, $textBody);

            return [
                'code' => $sendEmail ? 200 : 500,
                'body' => [
                    'status' => $sendEmail ? 'success' : 'error',
                    'message' => $sendEmail ?
                        ['validationEmail' => "Um e-mail de recuperação foi enviado para $email", 'email' => $email]
                        : 'Erro ao enviar e-mail de recuperação'
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
