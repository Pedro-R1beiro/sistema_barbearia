<?php

namespace Tests\Unit;

use App\Models\Client;
use PHPUnit\Framework\TestCase;

class ClientModelTest extends TestCase
{
    private static int $idClient;
    private static string $codeClient;
    private static string $emailClient;

    public static function setUpBeforeClass(): void
    {
        $client = new Client;
        $res = $client->post('Client', uniqid() . '@gmail.com', 'client12345', '1111111111');

        if ($res[0]) {
            self::$idClient = $res['id'];
            self::$codeClient = $res['code'];
            self::$emailClient = $res['email'];
        }
    }
    
    public function testGetDataClient() 
    {
        $client = new Client;
        $res = $client->getData();

        $this->assertIsArray($res);
        $this->assertArrayHasKey('name', $res[0]);
        $this->assertArrayHasKey('prev_appointments', $res[0]);
        $this->assertArrayHasKey('next_appointments', $res[0]);
        $this->assertArrayHasKey('total_appointments', $res[0]);
    }

    public function testGetByIdClient()
    {
        $client = new Client;
        $res = $client->getById(self::$idClient);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('id', $res);
        $this->assertArrayHasKey('email', $res);
    }

    public function testGetByEmailClient()
    {
        $client = new Client;
        $res = $client->getByEmail(self::$emailClient);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('id', $res);
        $this->assertArrayHasKey('email', $res);
    }

    public function testGetByCodeClient()
    {
        $client = new Client;
        $res = $client->getByCode(self::$codeClient);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('id', $res);
        $this->assertArrayHasKey('email', $res);
    }

    public function testPostClient()
    {
        $client = new Client;
        $res = $client->post('Client', uniqid() . '@gmail.com', 'client12345', '1111111111');

        $this->assertTrue($res[0]);
    }

    public function testPatchClient()
    {
        $client = new Client;
        $data = [
            'name' => 'ClientPatch',
            'email' => uniqid() . '@gmail.com',
            'password' => '12345client',
            'phone' => '2222222222',
            'verified' => 1,
            'active' => 0
        ];
        $res = $client->patch(self::$idClient, $data);

        $this->assertTrue($res);
    }

    public function testDisableClient()
    {
        $client = new Client;
        $res = $client->disable(self::$idClient);

        $this->assertTrue($res);
    }

    public function testDeleteClient()
    {
        $client = new Client;
        $res = $client->delete(self::$idClient);

        $this->assertTrue($res);
    }
}