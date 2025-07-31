<?php 

header('Content-Type: application/json');

require_once __DIR__ . '/Router.php';
use Routes\Router;
$router = new Router;

require_once __DIR__ . '/client.php';

function sendResponse($data, $httpCode = 200) {
    unset($router);
    http_response_code($httpCode);
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
    sendResponse([
        'status' => 'success',
        'message' => 'Requisição aceita'
    ]);
}

$response = $router->dispacth($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
sendResponse($response['body'], $response['code']);

?>