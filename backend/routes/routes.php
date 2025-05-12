<?php

require_once __DIR__ . '/../controllers/professionalController.php';
require_once __DIR__ . '/../controllers/ClientController.php';

$basePath = '/sistema_barbearia_2.0/backend/';
$requestUri = str_replace($basePath, '', $_SERVER['REQUEST_URI']);
$requestUri = trim(parse_url($requestUri, PHP_URL_PATH), '/');
$httpMethod = $_SERVER['REQUEST_METHOD'];
$data = in_array($httpMethod, ['POST', 'PUT', 'PATCH', 'DELETE']) ? json_decode(file_get_contents("php://input"), true) : $_GET;

header('Content-Type: application/json');

function sendResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

switch ($httpMethod . $requestUri) {
    case 'POSTclient/signup':
        $controller = new ClientController();
        $response = $controller->signup($data);
        sendResponse($response['body'], $response['code']);
        break;

    case 'POSTclient/login':
        $controller = new ClientController();
        $response = $controller->login($data);
        sendResponse($response['body'], $response['code']);
        break;

    case 'PATCHclient/validateEmail':
        $controller = new ClientController();
        $response = $controller->validateEmail($data);
        sendResponse($response['body'], $response['code']);
        break;

    case 'DELETEclient/delete':
        $controller = new ClientController();
        $response = $controller->delete();
        sendResponse($response['body'], $response['code']);
        break;

    case 'PATCHclient/chageInfo':
        $controller = new ClientController();
        $response = $controller->changeInfo($data);
        sendResponse($response['body'], $response['code']);
        break;

    case 'PATCHclient/changePassword':
        $controller = new ClientController();
        $response = $controller->changePassword($data);
        sendResponse($response['body'], $response['code']);
        break;

    case 'POSTclient/sendRecoveryEmail':
        $controller = new ClientController();
        $response = $controller->sendRecoveryEmail($data);
        sendResponse($response['body'], $response['code']);
        break;

    case 'PATCHclient/resetPassword':
        $controller = new ClientController();
        $response = $controller->resetPassword($data);
        sendResponse($response['body'], $response['code']);
        break;

    case 'GETclient/getScheduling':
        $controller = new ClientController();
        $response = $controller->getScheduling($data);
        sendResponse($response['body'], $response['code']);
        break;
    
    default:
        sendResponse(['status' => 'error', 'message' => 'Rota não encontrada'], 404);
        break;
}
