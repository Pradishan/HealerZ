<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $currentPassword = isset($data['currentPassword']) ? $data['currentPassword'] : null;
    $hashedPassword = isset($data['hashedPassword']) ? $data['hashedPassword'] : null;

    if (!$currentPassword || !$hashedPassword) {
        echo json_encode(array("isValid" => false));
        exit();
    }
    $isValid = password_verify($currentPassword, $hashedPassword);

    echo json_encode(array("isValid" => $isValid));
} else {
    echo json_encode(array("isValid" => false));
}
?>
