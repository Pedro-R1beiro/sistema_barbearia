<?php

namespace App\Controllers\Client;

use App\Controllers\Client\Auth\ResetPassword;
use App\Controllers\Client\Auth\ValidateEmail;
use App\Controllers\Client\Auth\Login;
use App\Controllers\Client\Auth\Logout;
use App\Controllers\Client\Auth\SendRecoveryEmail;
use App\Controllers\Client\Auth\Signup;

use OpenApi\Attributes as OA;

#[OA\Tag(
    name: "Client/Auth",
    description: "Rotas de autenticação do cliente: login, logout, cadastro, validação e recuperação de senha."
)]

class AuthController extends ClienteController
{
    #[OA\Patch(
        path: "/client/resetPassword",
        tags: ["Client/Auth"],
        summary: "Resetar senha do cliente",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["code", "newPassword"],
                properties: [
                    new OA\Property(property: "code", type: "string", example: "abc123xyz"),
                    new OA\Property(property: "newPassword", type: "string", example: "novaSenha123")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Senha alterada com sucesso"),
            new OA\Response(response: 400, description: "Valores inválidos"),
            new OA\Response(response: 404, description: "Conta não encontrada para o código"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function resetPassword($data)
    {
        $resetPassword = new ResetPassword($this->client);
        return $resetPassword->handle($data);
    }

    #[OA\Patch(
        path: "/client/validateEmail",
        tags: ["Client/Auth"],
        summary: "Validação de e-mail do cliente",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["code"],
                properties: [
                    new OA\Property(property: "code", type: "string", example: "abc123xyz")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "E-mail validado com sucesso"),
            new OA\Response(response: 400, description: "Sem código para validar"),
            new OA\Response(response: 404, description: "Nenhuma conta encontrada para o código"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function validateEmail($data)
    {
        $validateEmail = new ValidateEmail($this->client);
        return $validateEmail->handle($data);
    }

    #[OA\Post(
        path: "/client/login",
        tags: ["Client/Auth"],
        summary: "Login do cliente",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["email", "password"],
                properties: [
                    new OA\Property(property: "email", type: "string", maxLength: 50, example: "user@gmail.com"),
                    new OA\Property(property: "password", type: "string", minLength: 8, example: "12345678")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Login efetuado com sucesso"),
            new OA\Response(response: 400, description: "Dados inválidos"),
            new OA\Response(response: 401, description: "E-mail ou senha incorretos")
        ]
    )]
    public function login($data)
    {
        $login = new Login($this->client, $this->auth);
        return $login->handle($data);
    }

    #[OA\Post(
        path: "/client/logout",
        tags: ["Client/Auth"],
        summary: "Logout do cliente",
        responses: [
            new OA\Response(response: 204, description: "Logout bem-sucedido"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function logout()
    {
        $logout = new Logout($this->auth);
        return $logout->handle();
    }

    #[OA\Post(
        path: "/client/signup",
        tags: ["Client/Auth"],
        summary: "Cadastro de novo cliente",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["name", "email", "password", "phone", "validationScreen"],
                properties: [
                    new OA\Property(property: "name", type: "string", minLength: 3, maxLength: 30, example: "User Name"),
                    new OA\Property(property: "email", type: "string", maxLength: 50, example: "user@gmail.com"),
                    new OA\Property(property: "password", type: "string", minLength: 8, example: "12345678"),
                    new OA\Property(property: "phone", type: "string", example: "(11) 99999-9999"),
                    new OA\Property(property: "validationScreen", type: "string", example: "https://url.com/validate")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: "Conta criada e e-mail enviado"),
            new OA\Response(response: 200, description: "Conta criada, mas e-mail de validação não enviado"),
            new OA\Response(response: 400, description: "Dados inválidos"),
            new OA\Response(response: 409, description: "E-mail já cadastrado"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function signup($data)
    {
        $signup = new Signup($this->client, $this->emailSender);
        return $signup->handle($data);
    }

    #[OA\Post(
        path: "/client/sendRecoveryEmail",
        tags: ["Client/Auth"],
        summary: "Envio de e-mail de recuperação de senha",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["recoveryScreen"],
                properties: [
                    new OA\Property(property: "recoveryScreen", type: "string", example: "https://url.com/recover"),
                    new OA\Property(property: "email", type: "string", example: "user@gmail.com", nullable: true)
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "E-mail enviado"),
            new OA\Response(response: 400, description: "E-mail inválido"),
            new OA\Response(response: 404, description: "Conta não encontrada"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function sendRecoveryEmail($data)
    {
        $sendRecoveryEmail = new SendRecoveryEmail($this->client, $this->emailSender);
        return $sendRecoveryEmail->handle($data);
    }
}
