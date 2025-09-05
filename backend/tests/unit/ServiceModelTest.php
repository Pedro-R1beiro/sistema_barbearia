<?php

namespace Tests\Unit;

use App\Models\Service;
use PHPUnit\Framework\TestCase;

class ServiceModelTest extends TestCase
{
    private static int $idService;

    public static function setUpBeforeClass(): void
    {
        $service = new Service;
        $res = $service->post('Service', rand(15, 50), rand(20, 50));

        if ($res[0]) {
            self::$idService = $res['id'];
        }
    }

    public function testGetService()
    {
        $service = new Service;
        $res = $service->get();

        $this->assertIsArray($res);
        $this->assertArrayHasKey('id', $res[0]);
        $this->assertArrayHasKey('name', $res[0]);
    }

    public function testGetbyIdService()
    {
        $service = new Service;
        $res = $service->getById(self::$idService);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('id', $res);
        $this->assertArrayHasKey('name', $res);
    }

    public function testPostService()
    {
        $service = new Service;
        $res = $service->post('Service', rand(15, 50), rand(20, 50));

        $this->assertTrue($res[0]);
    }

    public function testPatchService()
    {
        $service = new Service;
        $res = $service->patch('ServicePatch', rand(15, 50), rand(20, 50), self::$idService);

        $this->assertTrue($res);
    }

    public function testDeleteService()
    {
        $service = new Service;
        $res = $service->delete(self::$idService);

        $this->assertTrue($res);
    }
}