<?php

use App\Controllers\Client\ClientDelete;
use App\Controllers\Client\ClientGet;
use App\Controllers\Client\ClientPatch;
use App\Controllers\Client\ClientPost;

use Routes\Router;

$router = new Router;

$controllers = [
    'DELETE' => new ClientDelete,
    'GET' => new ClientGet,
    'PATCH' => new ClientPatch,
    'POST' => new ClientPost
];

$routes = [
    'DELETE' => [
        'delete'
    ],
    'GET' => [
        'accountInformation',
        'availableTimeSlots',
        'getAppointment',
        'getServices'
    ],
    'PATCH' => [
        'cancelAppointment',
        'changeInfo',
        'changePassword',
        'resetPassword',
        'validateEmail'
    ],
    'POST' => [
        'login',
        'logout',
        'registerAppointment',
        'sendRecoveryEmail',
        'signup'
    ]
];

function addRoute($methodHttp, $uri, $controller, $methodName)
{
    global $router;

    $fullUri = 'client/' . $uri;

    $router->add($methodHttp, $fullUri, function () use ($controller, $methodName) {
        $data = $_SERVER['REQUEST_METHOD'] === 'GET' ? $_GET : json_decode(file_get_contents("php://input"), true);

        if ($methodName === 'cancelAppointment') {
            if (!isset($data['id']) && isset($_GET['id'])) {
                $data['id'] = $_GET['id'];
            }
        }

        return $controller->$methodName($data);
    });
}

foreach ($routes as $methodHttp => $routeList) {
    $controller = $controllers[$methodHttp];
    foreach ($routeList as $methodName) {
        addRoute($methodHttp, $methodName, $controller, $methodName);
    }
}