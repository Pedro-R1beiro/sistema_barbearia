<?php

namespace Routes;

class Router
{
    private $routes = [];
    private $basePath;

    public function __construct()
    {
        $this->basePath = $_ENV['APP_BASE_PATH'];
    }

    public function add($method, $uri, $handler)
    {
        $this->routes[$method][$uri] = $handler;
    }

    public function dispacth($method, $uri)
    {
        $uri = str_replace($this->basePath, '', $uri);
        $uri = trim(parse_url($uri, PHP_URL_PATH), '/');
        if (isset($this->routes[$method][$uri])) {
            return call_user_func($this->routes[$method][$uri]);
        }
        return [
            'code' => 404,
            'body' => [
                'status' => 'error',
                'message' => 'Rota não encontrada'
            ]
        ];
    }
}
