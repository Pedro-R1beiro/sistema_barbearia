<?php

$allowed_domains = array_map('trim', explode(',', $_ENV['CORS_DOMAINS'] ?? ''));
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

$allowed = false;

if ($origin && !empty($allowed_domains)) {
    $originHost = parse_url($origin, PHP_URL_HOST);
    $originPort = parse_url($origin, PHP_URL_PORT);

    foreach ($allowed_domains as $domain) {
        $domainHost = parse_url($domain, PHP_URL_HOST) ?: $domain;
        $domainPort = parse_url($domain, PHP_URL_PORT);

        // Match host e porta (se definida)
        $sameHost = strcasecmp($originHost, $domainHost) === 0;
        $samePort = !$domainPort || $originPort == $domainPort;

        if ($sameHost && $samePort) {
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
