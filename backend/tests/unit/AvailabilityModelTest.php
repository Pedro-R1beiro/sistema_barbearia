<?php

namespace Tests\Unit;

use App\Models\Availability;
use App\Models\Professional;
use PHPUnit\Framework\TestCase;

class AvailabilityModelTest extends TestCase
{
    public static int $idProfessional;
    public static int $idAvailability;

    public static function setUpBeforeClass(): void
    {
        $professional = new Professional;
        $resProfessional = $professional->post('ProfessionalService', uniqid() . '@gmail.com', 'professional123', '1111111111');

        if ($resProfessional[0]) {
            self::$idProfessional = $resProfessional['id'];

            $availability = new Availability;
            $resAvailability = $availability->post($resProfessional['id'], 1, '08:00', '18:00', 1, '12:00', '14:00');

            if ($resAvailability[0]) {
                self::$idAvailability = $resAvailability['id'];
            }
        }
    }

    public function testGetByProfessionalAvailability()
    {
        $availability = new Availability;
        $res = $availability->getByProfessional(self::$idProfessional, 1);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('id', $res[0]);

        $resAll = $availability->getByProfessional(self::$idProfessional);

        $this->assertIsArray($resAll);
        $this->assertArrayHasKey('id', $resAll[0]);
    }

    public function testPostAvailability()
    {
        $availability = new Availability;
        $res = $availability->post(self::$idProfessional, 1, '08:00', '18:00', 1, '12:00', '14:00');

        $this->assertTrue($res[0]);
    }

    public function testPatchAvailability()
    {
        $availability = new Availability;
        $res = $availability->patch(self::$idAvailability, self::$idProfessional, 2, '09:00', '16:00', 0);

        $this->assertTrue($res);
    }

    public function testDeleteAvailability()
    {
        $availability = new Availability;
        $res = $availability->delete(self::$idAvailability);

        $this->assertTrue($res);
    }
}
