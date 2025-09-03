<?php

namespace Tests\Unit;

use App\Models\Client;
use PHPUnit\Framework\TestCase;

class ClientModelTest extends TestCase
{
    private int $idClient;

    public function testPostClient()
    {
        $client = new Client();
        $res = $client->post('Teste', 'testePost@gmail.com', 'teste12345', '1111111111');

        $this->assertTrue($res[0]);
    }

    public function testGetDataClient() 
    {
        $client = new Client();
        $res = $client->getData();

        $this->assertIsArray($res);
        $this->assertArrayHasKey('name', $res[0]);
        $this->assertArrayHasKey('prev_appointments', $res[0]);
        $this->assertArrayHasKey('next_appointments', $res[0]);
        $this->assertArrayHasKey('total_appointments', $res[0]);
    }

    public function testGetByIdClient()
    {
        $client = new Client();
        $res = $client->getById(1);

        $this->assertIsArray($res);
        $this->assertArrayHasKey('id', $res);
    }
}