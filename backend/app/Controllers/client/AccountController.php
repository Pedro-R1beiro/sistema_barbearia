<?php

namespace App\Controllers\Client;

use App\Controllers\Client\Account\DeleteClient;
use App\Controllers\Client\Account\AccountInformation;
use App\Controllers\Client\Account\ChangeInfo;
use App\Controllers\Client\Account\ChangePassword;

use OpenApi\Attributes as OA;

#[OA\Tag(
    name: "Client/Account",
    description: "Rotas relacionadas à conta do cliente: informações, alteração de dados, alteração de senha e exclusão da conta."
)]

class AccountController extends ClienteController
{
    #[OA\Delete(
        path: "/client/delete",
        tags: ["Client/Account"],
        summary: "Deletar conta do cliente",
        responses: [
            new OA\Response(response: 204, description: "Conta deletada"),
            new OA\Response(response: 404, description: "Nenhuma conta encontrada com o Id salvo nos cookies"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function delete($data)
    {
        $delete = new DeleteClient($this->client, $this->appo);
        return $delete->handle($data);
    }

    #[OA\Get(
        path: "/client/accountInformation",
        tags: ["Client/Account"],
        summary: "Obter informações da conta do cliente",
        responses: [
            new OA\Response(
                response: 200,
                description: "Informações da conta",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "name", type: "string", example: "User Name"),
                        new OA\Property(property: "email", type: "string", example: "user@gmail.com"),
                        new OA\Property(property: "phone", type: "string", example: "(11) 99999-9999")
                    ]
                )
            ),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function accountInformation($data)
    {
        $accountInfo = new AccountInformation($this->client);
        return $accountInfo->handle($data);
    }

    #[OA\Patch(
        path: "/client/chageInfo",
        tags: ["Client/Account"],
        summary: "Alterar informações da conta",
        requestBody: new OA\RequestBody(
            required: true,
            description: "Obrigatório: senha atual + ao menos 1 informação para alterar",
            content: new OA\JsonContent(
                required: ["password"],
                properties: [
                    new OA\Property(property: "name", type: "string", nullable: true, example: "Novo Nome"),
                    new OA\Property(property: "email", type: "string", nullable: true, example: "novoemail@gmail.com"),
                    new OA\Property(property: "phone", type: "string", nullable: true, example: "(11) 98888-8888"),
                    new OA\Property(property: "password", type: "string", example: "senhaAtual123")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Dados alterados com sucesso"),
            new OA\Response(response: 400, description: "Dados inválidos"),
            new OA\Response(response: 404, description: "Conta não encontrada"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function changeInfo($data)
    {
        $changeInfo = new ChangeInfo($this->client);
        return $changeInfo->handle($data);
    }

    #[OA\Patch(
        path: "/client/chagePassword",
        tags: ["Client/Account"],
        summary: "Alterar senha da conta",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["currentPassword", "newPassword"],
                properties: [
                    new OA\Property(property: "currentPassword", type: "string", example: "senhaAtual123"),
                    new OA\Property(property: "newPassword", type: "string", example: "novaSenha123")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Senha alterada com sucesso"),
            new OA\Response(response: 400, description: "Valores inválidos ou senha atual incorreta"),
            new OA\Response(response: 404, description: "Conta não encontrada"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function changePassword($data)
    {
        $changePassword = new ChangePassword($this->client);
        return $changePassword->handle($data);
    }
}
