<?php

namespace App\Controllers\Client;

use App\Controllers\Client\Appointment\AvailableTimeSlots;
use App\Controllers\Client\Appointment\GetAppointment;
use App\Controllers\Client\Appointment\GetServices;
use App\Controllers\Client\Appointment\CancelAppointment;
use App\Controllers\Client\Appointment\RegisterAppointment;

use OpenApi\Attributes as OA;

#[OA\Tag(
    name: "Client/Appointment",
    description: "Rotas para gerenciamento de agendamentos: horários disponíveis, registrar, listar, cancelar e serviços."
)]

class AppointmentController extends ClienteController
{
    #[OA\Get(
        path: "/client/availableTimeSlots",
        tags: ["Client/Appointment"],
        summary: "Listar horários disponíveis para agendamento",
        parameters: [
            new OA\Parameter(name: "date", in: "query", required: true, description: "Data no formato Y-m-d", schema: new OA\Schema(type: "string", example: "2025-05-21")),
            new OA\Parameter(name: "service", in: "query", required: true, description: "IDs dos serviços separados por vírgula", schema: new OA\Schema(type: "string", example: "1,2,3"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Horários encontrados",
                content: new OA\JsonContent(
                    type: "array",
                    items: new OA\Items(
                        properties: [
                            new OA\Property(property: "id", type: "integer", example: 1),
                            new OA\Property(property: "name", type: "string", example: "Nome do Profissional"),
                            new OA\Property(property: "email", type: "string", example: "profissional@gmail.com"),
                            new OA\Property(property: "phone", type: "string", example: "11999999999"),
                            new OA\Property(property: "status", type: "string", enum: ["day_off", "on_vacation", "not_working", "fully_booked", "available"], example: "available"),
                            new OA\Property(property: "timeSlot", type: "array", items: new OA\Items(type: "string", example: "08:30"))
                        ]
                    )
                )
            ),
            new OA\Response(response: 400, description: "Valores inválidos"),
            new OA\Response(response: 409, description: "Erro interno")
        ]
    )]
    public function availableTimeSlots($data)
    {
        $availableTimeSlots = new AvailableTimeSlots(
            $this->service,
            $this->prof,
            $this->vacat,
            $this->dayOff,
            $this->avail,
            $this->appo
        );
        return $availableTimeSlots->handle($data);
    }

    #[OA\Get(
        path: "/client/getAppointment",
        tags: ["Client/Appointment"],
        summary: "Listar agendamentos do cliente",
        parameters: [
            new OA\Parameter(name: "filter", in: "query", required: false, description: "Filtro (today, nearby, history, next, last)", schema: new OA\Schema(type: "string")),
            new OA\Parameter(name: "status", in: "query", required: false, description: "Status separados por vírgula (booked, completed, canceled)", schema: new OA\Schema(type: "string", example: "booked,canceled"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Agendamentos encontrados",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "id", type: "integer", example: 1),
                        new OA\Property(property: "date", type: "string", format: "date", example: "2025-05-11"),
                        new OA\Property(property: "startTime", type: "string", example: "08:00:00"),
                        new OA\Property(property: "endTime", type: "string", example: "08:30:00"),
                        new OA\Property(property: "professionalName", type: "string", example: "Nome do Barbeiro"),
                        new OA\Property(property: "clientName", type: "string", example: "Nome do Cliente"),
                        new OA\Property(property: "serviceName", type: "string", example: "Corte de cabelo"),
                        new OA\Property(property: "servicePrice", type: "string", example: "15.00")
                    ]
                )
            ),
            new OA\Response(response: 204, description: "Nenhum agendamento encontrado"),
            new OA\Response(response: 400, description: "Filtro inválido"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function getAppointment($data)
    {
        $getAppointment = new GetAppointment($this->appo, $this->appoService);
        return $getAppointment->handle($data);
    }

    #[OA\Get(
        path: "/client/getServices",
        tags: ["Client/Appointment"],
        summary: "Listar serviços disponíveis",
        responses: [
            new OA\Response(
                response: 200,
                description: "Serviços encontrados",
                content: new OA\JsonContent(
                    type: "array",
                    items: new OA\Items(
                        properties: [
                            new OA\Property(property: "id", type: "integer", example: 1),
                            new OA\Property(property: "name", type: "string", example: "Corte de cabelo"),
                            new OA\Property(property: "price", type: "string", example: "15.00"),
                            new OA\Property(property: "duration", type: "integer", example: 30),
                            new OA\Property(property: "active", type: "integer", example: 1)
                        ]
                    )
                )
            ),
            new OA\Response(response: 204, description: "Nenhum serviço encontrado"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function getServices()
    {
        $getServices = new GetServices($this->service);
        return $getServices->handle();
    }

    #[OA\Patch(
        path: "/client/cancelAppointment",
        tags: ["Client/Appointment"],
        summary: "Cancelar um agendamento",
        parameters: [
            new OA\Parameter(name: "id", in: "query", required: true, description: "ID do agendamento", schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 204, description: "Agendamento cancelado"),
            new OA\Response(response: 400, description: "Id não informado ou inválido"),
            new OA\Response(response: 403, description: "Tentativa de excluir agendamento de outra pessoa"),
            new OA\Response(response: 404, description: "Nenhum agendamento encontrado"),
            new OA\Response(response: 422, description: "Agendamento já começou ou está no passado"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function cancelAppointment($data)
    {
        $cancelAppointment = new CancelAppointment($this->appo);
        return $cancelAppointment->handle($data);
    }

    #[OA\Post(
        path: "/client/registerAppointment",
        tags: ["Client/Appointment"],
        summary: "Registrar novo agendamento",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["startTime", "date", "idProfessional", "service"],
                properties: [
                    new OA\Property(property: "startTime", type: "string", example: "11:30"),
                    new OA\Property(property: "date", type: "string", example: "2025-05-19"),
                    new OA\Property(property: "idProfessional", type: "integer", example: 1),
                    new OA\Property(property: "service", type: "string", example: "1,2,3")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: "Agendamento registrado com sucesso"),
            new OA\Response(response: 400, description: "Dados inválidos"),
            new OA\Response(response: 500, description: "Erro interno")
        ]
    )]
    public function registerAppointment($data)
    {
        $registerAppointment = new RegisterAppointment(
            $this->service,
            $this->prof,
            $this->vacat,
            $this->dayOff,
            $this->avail,
            $this->appo,
            $this->appoService
        );

        return $registerAppointment->handle($data);
    }
}
