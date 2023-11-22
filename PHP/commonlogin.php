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

    if (empty($data['employeeID']) || empty($data['password'])) {
        echo json_encode(array("message" => "Admin ID and Password are required."));
        exit();
    }

    $employeeID = $data['employeeID'];
    $password = $data['password'];
    $rememberMe = isset($data['rememberMe']) ? $data['rememberMe'] : false;

    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();

    $sql = "SELECT * FROM employee WHERE employee_ID = :employeeID LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":employeeID", $employeeID);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user["Password"])) {
        echo json_encode(array("message" => "Invalid User ID or Password."));
        exit();
    }

    $userRole = $user["role"]; 
    echo json_encode(array("message" => "Login successful.", "employeeID" => $employeeID, "role" => $userRole));
} else {
    echo json_encode(array("message" => "Method not allowed."));
}
?>
