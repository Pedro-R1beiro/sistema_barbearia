<?php
// Habilita CORS para qualquer origem — você pode trocar o * por um domínio específico
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");

// Se for uma requisição de pré-vôo (OPTIONS), responda imediatamente
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Requisição aceita'
    ]);
    exit;
}

// require_once __DIR__ . '/../controllers/professionalController.php';

require_once __DIR__ . '/../controllers/clientController/clientGet.php';
require_once __DIR__ . '/../controllers/clientController/clientPost.php';
require_once __DIR__ . '/../controllers/clientController/clientPatch.php';
require_once __DIR__ . '/../controllers/clientController/clientDelete.php';

$basePath = '/sistema_barbearia_2.0/backend/';
$requestUri = str_replace($basePath, '', $_SERVER['REQUEST_URI']);
$requestUri = trim(parse_url($requestUri, PHP_URL_PATH), '/');

[$requestType, $methodType] = explode('/', $requestUri) + [null, null];

$httpMethod = $_SERVER['REQUEST_METHOD'];
$data = in_array($httpMethod, ['POST', 'PUT', 'PATCH', 'DELETE']) ? json_decode(file_get_contents("php://input"), true) : $_GET;

header('Content-Type: application/json');

function sendResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

function resolveRoute($controller, $methodType, $routesMap)
{
    global $data;

    if (!isset($routesMap[$methodType])) {
        return [
            'code' => 404,
            'body' => ['status' => 'error', 'message' => 'Rota não encontrada']
        ];
    }

    $method = $routesMap[$methodType];
    return $controller->$method($data);
}

if ($requestType === 'client') {
    try {
        switch ($httpMethod) {
            case 'GET':
                $routesMap = [
                    'getAppointment' => 'getAppointment',
                    'getServices' => 'getServices',
                    'availableTimeSlots' => 'availableTimeSlots'
                ];
                $controller = new ClientGet();
                $response = resolveRoute($controller, $methodType, $routesMap);
                break;

            case 'POST':
                $routesMap = [
                    'signup' => 'signup',
                    'login' => 'login',
                    'sendRecoveryEmail' => 'sendRecoveryEmail',
                    'registerAppointment' => 'registerAppointment',
                    'logout' => 'logout'
                ];
                $controller = new ClientPost();
                $response = resolveRoute($controller, $methodType, $routesMap);
                break;

            case 'PATCH':
                $routesMap = [
                    'validateEmail' => 'validateEmail',
                    'changeInfo' => 'changeInfo',
                    'changePassword' => 'changePassword',
                    'resetPassword' => 'resetPassword'
                ];
                $controller = new ClientPatch();
                $response = resolveRoute($controller, $methodType, $routesMap);
                break;

            case 'DELETE':
                $routesMap = [
                    'delete' => 'delete',
                    'deleteAppointment' => 'deleteAppointment'
                ];
                $controller = new ClientDelete();

                // Ajuste extra no caso de deleteAppointment
                if ($methodType === 'deleteAppointment') {
                    if (!isset($data['id']) && isset($_GET['id'])) {
                        $data['id'] = $_GET['id'];
                    }
                }

                $response = resolveRoute($controller, $methodType, $routesMap);
                break;

            default:
                sendResponse(['status' => 'error', 'message' => 'Método HTTP não suportado'], 405);
        }

        sendResponse($response['body'], $response['code']);
    } catch (Exception $e) {
        sendResponse([
            'status' => 'error',
            'message' => 'Erro interno do servidor',
            'error' => $e->getMessage()
        ], 500);
    }
} else {
    sendResponse(['status' => 'error', 'message' => 'Rota não encontrada'], 404);
}
