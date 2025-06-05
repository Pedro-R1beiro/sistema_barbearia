<?php

class SendRecoveryEmail
{
    private $client;
    private $emailSender;

    public function __construct($client, $emailSender) {
        
    }

    public function default($data)
    {
        try {
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
                $userData = $this->authenticate();
                if (isset($userData['body']['status']) && $userData['body']['status'] == 'error') {
                    return [
                        'code' => 404,
                        'body' => [
                            'status' => 'error',
                            'message' => 'Nenhum e-mail para recuperação foi informado'
                        ]
                    ];
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
