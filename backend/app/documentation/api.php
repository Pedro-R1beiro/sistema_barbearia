<?php
require __DIR__ . '/../../vendor/autoload.php';
require __DIR__ . '/../../config/bootstrap.php';
use OpenApi\Generator;

$openapi = Generator::scan([__DIR__ . '/../']);

// transforma em array
$spec = json_decode($openapi->toJson(), true);

// substitui os servers
$spec['servers'] = [[
    'url' => $_ENV['APP_BASE_URL'],
    'description' => 'Servidor definido com base no APP_BASE_URL do .env'
]];

// devolve pro Swagger UI
header('Content-Type: application/json');
echo json_encode($spec, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);    