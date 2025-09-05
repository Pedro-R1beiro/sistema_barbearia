<?php

namespace Tests\Unit;

use App\Models\Appointment;
use App\Models\Client;
use App\Models\Professional;
use PHPUnit\Framework\TestCase;

class AppointmentModelTest extends TestCase
{
    private static int $idProfessional;
    private static int $idClient;
    private static int $idAppointment;

    public static function setUpBeforeClass(): void
    {
        $professional = new Professional;
        $client = new Client;
        $appointment = new Appointment;

        $resProfessional = $professional->post('ProfessionalAppo', uniqid() . '@gmail.com', 'professional123', '1111111111');
        $resClient = $client->post('ClientAppo', uniqid() . '@gmail.com', 'client12345', '1111111111');

        if ($resClient[0] && $resProfessional[0]) {
            self::$idProfessional = $resProfessional['id'];
            self::$idClient = $resClient['id'];

            $resAppointment = $appointment->post('2025-09-19', '08:00', '09:00', $resProfessional['id'], $resClient['id']);

            if ($resAppointment[0]) {
                self::$idAppointment = $resAppointment['id'];
            }
        }
    }

    public function testIsOnAppointment()
    {
        $appointment = new Appointment;
        $res = $appointment->isOnAppointment('2025-09-19', self::$idProfessional, '08:00', '09:00');

        $this->assertIsArray($res);
        $this->assertArrayHasKey('date', $res[0]);
    }

    public function testGetAppointment()
    {
        $appointment = new Appointment;
        $res = $appointment->get();

        $this->assertIsArray($res);
        $this->assertArrayHasKey('date', $res[0]);
    }

    public function testGetByFilterAppointment()
    {
        $appointment = new Appointment;
        $res = $appointment->get('booked');

        $this->assertIsArray($res);
        $this->assertArrayHasKey('date', $res[0]);
    }

    public function testGetByStatusAppointment()
    {
        $appointment = new Appointment;
        $res = $appointment->get(null, 'booked');

        $this->assertIsArray($res);
        $this->assertArrayHasKey('date', $res[0]);
    }

    public function testGetByProfessionalAppointment()
    {
        $appointment = new Appointment;
        $res = $appointment->get(null, null, self::$idProfessional);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('date', $res[0]);
    }

    public function testGetByClientAppointment()
    {
        $appointment = new Appointment;
        $res = $appointment->get(null, null, null, self::$idClient);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('date', $res[0]);
    }

    public function testGetByIdAppointment()
    {
        $appointment = new Appointment;
        $res = $appointment->getById(self::$idAppointment);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('date', $res);
    }

    public function testPostAppointment()
    {
        $appointment = new Appointment;
        $res = $appointment->post('2025-09-19', '08:00', '09:00', self::$idProfessional, self::$idClient);

        $this->assertTrue($res[0]);
    }

    public function testPatchAppointment()
    {
        $appointment = new Appointment;
        $res = $appointment->patch(self::$idAppointment, 'canceled');

        $this->assertTrue($res);
    }
}