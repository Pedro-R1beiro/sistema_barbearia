<?php

use App\Models\Appointment;
use App\Models\AppointmentService;
use App\Models\Client;
use App\Models\Professional;
use App\Models\Service;
use PHPUnit\Framework\TestCase;

class AppointmentServiceModelTest extends TestCase
{
    private static int $idProfessional;
    private static int $idService;
    private static int $idClient;
    private static int $idAppointment;
    private static int $idAppointmentService;

    public static function setUpBeforeClass(): void
    {
        $professional = new Professional;
        $resProfessional = $professional->post('ProfessionalAppointmentService', uniqid() . '@gmail.com', 'professional123', '1111111111');

        $client = new Client;
        $resClient = $client->post('ClientAppointmentService', uniqid() . '@gmail.com', 'client12345', '1111111111');

        if ($resProfessional[0] && $resClient[0]) {
            self::$idProfessional = $resProfessional['id'];
            self::$idClient = $resClient['id'];

            $appointment = new Appointment;
            $resAppointment = $appointment->post(date('Y-m-d', strtotime('tomorrow')), '08:00', '09:00', $resProfessional['id'], $resClient['id']);

            if ($resAppointment[0]) {
                self::$idAppointment = $resAppointment['id'];

                $service = new Service;
                $resService = $service->post('ServiceAppointmentService', rand(15, 50), rand(20,50));

                if ($resService[0]) {
                    self::$idService = $resService['id'];

                    $appointmentService = new AppointmentService;
                    $resAppointmentService = $appointmentService->post($resService['id'], $resAppointment['id']);

                    if ($resAppointmentService[0]) {
                        self::$idAppointmentService = $resAppointmentService['id'];
                    }
                }
            }
        }
    }

    public function testGetByServiceAppointmentService() 
    {
        $appointmentService = new AppointmentService;
        $res = $appointmentService->getByService(self::$idService);

        $this->assertIsArray($res);
    }

    public function testGetByAppointmentAppointmentService() 
    {
        $appointmentService = new AppointmentService;
        $res = $appointmentService->getByAppointment(self::$idService);

        $this->assertIsArray($res);
    }

    public function testPostAppointmentService()
    {
        $appointmentService = new AppointmentService;
        $res = $appointmentService->post(self::$idService, self::$idAppointment);

        $this->assertTrue($res[0]);
    }
    
    public function testDeleteAppointmentService()
    {
        $appointmentService = new AppointmentService;
        $res = $appointmentService->delete(self::$idAppointmentService);

        $this->assertTrue($res);
    }
}