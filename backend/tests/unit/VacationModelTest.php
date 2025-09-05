<?php

namespace Tests\Unit;

use App\Models\Professional;
use App\Models\Vacation;
use PHPUnit\Framework\TestCase;

class VacationModelTest extends TestCase 
{
    private static int $idProfessional;
    private static int $idVacation;

    public static function setUpBeforeClass(): void
    {
        $professional = new Professional;
        $resProfessional = $professional->post('ProfessionalVacation', uniqid() . '@gmail.com', 'professional123', '1111111111');

        if ($resProfessional[0]) {
            self::$idProfessional = $resProfessional['id'];

            $vacation = new Vacation;
            $resVacation = $vacation->post($resProfessional['id'], date('Y-m-d'), date('Y-m-d', strtotime('tomorrow')));

            if ($resVacation[0]) {
                self::$idVacation = $resVacation['id'];
            }
        }
    }

    public function testIsOnVacation() {
        $vacation = new Vacation;
        $res = $vacation->isOnVacation(self::$idProfessional, date('Y-m-d'));

        $this->assertTrue($res);
    }

    public function testGetVacation() {
        $vacation = new Vacation;
        $res = $vacation->get(self::$idProfessional);

        $this->assertIsArray($res);
    }

    public function testPostVacation() {
        $vacation = new Vacation;
        $res = $vacation->post(self::$idProfessional, date('Y-m-d'), date('Y-m-d', strtotime('tomorrow')));

        $this->assertTrue($res[0]);
    }

    public function testPatchVacation() {
        $vacation = new Vacation;
        $res = $vacation->patch(self::$idVacation, date('Y-m-d', strtotime('strtotime')), date('Y-m-d', strtotime('+1 day')));

        $this->assertTrue($res);
    }

    public function testDeleteVacation() {
        $vacation = new Vacation;
        $res = $vacation->delete(self::$idVacation);

        $this->assertTrue($res);
    }
}