<?php

namespace Tests\Unit;

use App\Models\DayOff;
use App\Models\Professional;
use PHPUnit\Framework\TestCase;

class DayOffModelTest extends TestCase
{
    private static int $idProfessional;
    private static int $idDayOff;

    public static function setUpBeforeClass(): void
    {
        $professional = new Professional;
        $resProfessional = $professional->post('ProfessionalService', uniqid() . '@gmail.com', 'professional123', '1111111111');

        if ($resProfessional[0]) {
            self::$idProfessional = $resProfessional['id'];

            $dayOff = new DayOff;
            $resDayOff = $dayOff->post($resProfessional['id'], date('Y-m-d', strtotime('tomorrow')));

            if ($resDayOff[0]) {
                self::$idDayOff = $resDayOff['id'];
            }
        }
    }

    public function testIsOnDayOff()
    {
        $dayOff = new DayOff;
        $res = $dayOff->isOnDayOff(self::$idProfessional, date('Y-m-d', strtotime('tomorrow')));

        $this->assertIsArray($res);
    }
    
    public function testGetDayOff()
    {
        $dayOff = new DayOff;
        $res = $dayOff->get(self::$idProfessional);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('id', $res[0]);
    }

    public function testPostDayOff()
    {
        $dayOff = new DayOff;
        $res = $dayOff->post(self::$idProfessional, date('Y-m-d', strtotime('tomorrow')));

        $this->assertTrue($res[0]);
    }

    public function testPatchDayOff()
    {
        $dayOff = new DayOff;
        $res = $dayOff->patch(self::$idProfessional, date('Y-m-d'));

        $this->assertTrue($res);
    }

    public function testDeleteDayOff()
    {
        $dayOff = new DayOff;
        $res = $dayOff->delete(self::$idDayOff);

        $this->assertTrue($res);
    }
}
