<?php

use App\Controllers\Client\AccountController;
use App\Controllers\Client\AppointmentController;
use App\Controllers\Client\AuthController;
use App\Services\Authenticate;
use Routes\Router;

$router = new Router;

$controllersList = [
    'AuthController' => new AuthController,
    'AccountController' => new AccountController,
    'AppointmentController' => new AppointmentController
];

$routes = [
    'AuthController' => [
        'PATCH' => [
            'resetPassword' => [
                'requires_cookie' => false,
                'requires_id' => false
            ],
            'validateEmail' => [
                'requires_cookie' => false,
                'requires_id' => false
            ]
        ],
        'POST' => [
            'login' => [
                'requires_cookie' => false,
                'requires_id' => false
            ],
            'logout' => [
                'requires_cookie' => true,
                'requires_id' => false
            ],
            'sendRecoveryEmail' => [
                'requires_cookie' => false,
                'requires_id' => false
            ],
            'signup' => [
                'requires_cookie' => false,
                'requires_id' => false
            ]
        ]
    ],
    'AccountController' => [
        'DELETE' => [
            'delete' => [
                'requires_cookie' => true,
                'requires_id' => true
            ]
        ],
        'GET' => [
            'accountInformation' => [
                'requires_cookie' => true,
                'requires_id' => true
            ]
        ],
        'PATCH' => [
            'changeInfo' => [
                'requires_cookie' => true,
                'requires_id' => true
            ],
            'changePassword' => [
                'requires_cookie' => true,
                'requires_id' => true
            ]
        ]
    ],
    'AppointmentController' => [
        'GET' => [
            'availableTimeSlots' => [
                'requires_cookie' => true,
                'requires_id' => true
            ],
            'getAppointment' => [
                'requires_cookie' => true,
                'requires_id' => true
            ],
            'getServices' => [
                'requires_cookie' => true,
                'requires_id' => false
            ]
        ],
        'PATCH' => [
            'cancelAppointment' => [
                'requires_cookie' => true,
                'requires_id' => true
            ]
        ],
        'POST' => [
            'registerAppointment' => [
                'requires_cookie' => true,
                'requires_id' => true
            ]
        ]
    ]
];

function addRoute($methodHttp, $uri, $controller, $methodName, $routeConfig)
{
    global $router;
    global $routes;

    $fullUri = 'client/' . $uri;

    $router->add($methodHttp, $fullUri, function () use ($controller, $methodName, $routeConfig) {
        $data = $_SERVER['REQUEST_METHOD'] === 'GET'
            ? $_GET
            : json_decode(file_get_contents("php://input"), true);

        if ($methodName === 'cancelAppointment') {
            if (!isset($data['id']) && isset($_GET['id'])) {
                $data['id'] = $_GET['id'];
            }
        }

        $auth = new Authenticate('client');

        if ($routeConfig['requires_cookie']) {
            $authResult = $auth->ensureAuth();

            if (!isset($authResult['id'])) {
                return [
                    'code' => 401,
                    'body' => [
                        'status' => 'error',
                        'message' => 'Não autenticado'
                    ]
                ];
            }

            if ($routeConfig['requires_id']) {
                $data['id_user'] = $authResult['id'];
            }
        }

        return $controller->$methodName($data);
    });
}

foreach ($routes as $controller => $methods) {
    $controllerInstance = $controllersList[$controller];
    foreach ($methods as $httpMethod => $routesPerMethod) {
        foreach ($routesPerMethod as $routeName => $config) {
            addRoute($httpMethod, $routeName, $controllerInstance, $routeName, $config);
        }
    }
}