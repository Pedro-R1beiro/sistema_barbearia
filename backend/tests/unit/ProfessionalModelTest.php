<?php

namespace Tests\Unit;

use App\Models\Professional;
use PHPUnit\Framework\TestCase;

class ProfessionalModelTest extends TestCase
{
    private static int $idProfessional;
    private static string $emailProfessional;

    public static function setUpBeforeClass(): void
    {
        $professional = new Professional();
        $res = $professional->post('Professional', uniqid() . '@gmail.com', 'professional123', '1111111111');

        if ($res[0]) {
            self::$idProfessional = $res['id'];
            self::$emailProfessional = $res['email'];
        }
    }

    public function testGetByIdProfessional()
    {
        $professional = new Professional();
        $res = $professional->getById(self::$idProfessional);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('id', $res);
        $this->assertArrayHasKey('email', $res);
    }

    public function testGetByEmailProfessional()
    {
        $professional = new Professional();
        $res = $professional->getByEmail(self::$emailProfessional);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('id', $res);
        $this->assertArrayHasKey('email', $res);
    }

    public function testGetProfessional()
    {
        $professional = new Professional();
        $res = $professional->get();

        $this->assertIsArray($res);
        $this->assertArrayHasKey('id', $res[0]);
        $this->assertArrayHasKey('email', $res[0]);
    }

    public function testPostProfessional()
    {
        $professional = new Professional();
        $res = $professional->post('Professional', uniqid() . '@gmail.com', 'professional123', '1111111111');

        $this->assertTrue($res[0]);
    }

    public function testPatchProfessional()
    {
        $professional = new Professional();
        $res = $professional->patch(self::$idProfessional, 'ProfessionalPatch', uniqid() . '@gmail.com', '123professional', '2222222222');

        $this->assertTrue($res);
    }

    public function testDeleteProfessional()
    {
        $professional = new Professional();
        $res = $professional->delete(self::$idProfessional);

        $this->assertTrue($res);
    }
}