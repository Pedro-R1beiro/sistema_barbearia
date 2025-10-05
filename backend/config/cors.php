<?php

$allowed_domains = array_map('trim', explode(',', $_ENV['CORS_DOMAINS'] ?? ''));
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

$allowed = false;

if ($origin && !empty($allowed_domains)) {
    foreach ($allowed_domains as $domain) {
        // Verifica se a origem termina com o domínio permitido (.com ou .com.br, por exemplo)
        if (preg_match("/" . preg_quote($domain, '/') . "$/i", parse_url($origin, PHP_URL_HOST))) {
            $allowed = true;
            break;
        }
    }
}

if ($allowed) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: none");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}