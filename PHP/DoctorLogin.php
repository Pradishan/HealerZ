<?php
// login.php

require './classes/DBconnector.php';
use classes\DBconnector;

// Enable CORS for all requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add 'Authorization' if you are using it in your requests

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    // Handle the preflight request and return the allowed methods
    http_response_code(200);
    exit();
}

$method = $_SERVER["REQUEST_METHOD"];

// Login API endpoint
if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['doctorID']) || empty($data['password'])) {
        // http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Doctor ID and Password are required."));
        exit();
    }

    $doctorID = $data['doctorID'];
    $password = $data['password'];

    // Create a new MySQL connection using DBconnector class
    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();

    $sql = "SELECT * FROM doctor WHERE Doctor_ID = :doctorID LIMIT 1"; // Use named parameters to prevent SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":doctorID", $doctorID);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || $password !== $user["Password"]) {
        echo json_encode(array("message" => "Invalid Doctor ID or Password."));
        // http_response_code(401); // Unauthorized
        exit();
    }

    // http_response_code(200); // OK
    echo json_encode(array("message" => "Login successful."));

} else {
    // http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Method not allowed."));
}
?>
