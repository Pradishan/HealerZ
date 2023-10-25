<?php
require './classes/DBconnector.php';
use classes\DBconnector;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['adminID']) || empty($data['password'])) {
        echo json_encode(array("message" => "Admin ID and Password are required."));
        exit();
    }

    $adminID = $data['adminID']; // Change 'employeeID' to 'adminID'
    $password = $data['password'];
    $rememberMe = isset($data['rememberMe2']) ? $data['rememberMe2'] : false;

    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();

    $sql = "SELECT employee_ID, role, Password FROM employee WHERE employee_ID = :adminID LIMIT 1"; 
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":adminID", $adminID);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || $password !== $user["Password"]) {
        echo json_encode(array("message" => "Invalid Admin ID or Password."));
        exit();
    }

    if ($rememberMe) {
        setcookie("adminID", $adminID, time() + 24 * 60 * 60 * 60, "/");
        setcookie("authToken2", $token, time() + 24 * 60 * 60 * 60, "/");
    }

    // Include the 'role' in the response data
    echo json_encode(array("message" => "Login successful.", "adminID" => $adminID, "role" => $user["role"]));

} else {
    echo json_encode(array("message" => "Method not allowed."));
}
?>
