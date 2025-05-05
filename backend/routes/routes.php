<?php

require_once __DIR__ . '/../controllers/professionalController.php';
require_once __DIR__ . '/../controllers/ClientController.php';

$basePath = '/sistema_barbearia_2.0/backend/';
$requestUri = str_replace($basePath, '', $_SERVER['REQUEST_URI']);
$requestUri = trim(parse_url($requestUri, PHP_URL_PATH), '/');
$httpMethod = $_SERVER['REQUEST_METHOD'];
$data = $httpMethod === 'POST' ? json_decode(file_get_contents('php://input'), true) ?? [] : $_GET;

header('Content-Type: application/json');

switch ($requestUri) {
    case 'client/signup':
        $controller = new ClientController();
        echo json_encode($controller->signup($data));
        break;

    case 'client/login':
        $controller = new ClientController();
        echo json_encode($controller->login($data));
        break;

    default:
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Rota não encontrada']);
        break;
}
