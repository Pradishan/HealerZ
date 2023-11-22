<?php
require '../../classes/DBconnector.php';
use classes\DBconnector;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);

    $employeeID = isset($data['employeeID']) ? $data['employeeID'] : null;
    $newPassword = isset($data['newPassword']) ? $data['newPassword'] : null;

    if (!$employeeID || !$newPassword) {
        echo json_encode(array("message" => "Employee ID and new password are required."));
        exit();
    }

    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    $sql = "UPDATE employee SET Password = :hashedPassword WHERE employee_ID = :employeeID";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":hashedPassword", $hashedPassword);
    $stmt->bindParam(":employeeID", $employeeID);

    $res = $stmt->execute();

    if ($res) {
        echo json_encode(array("message" => "Password updated successfully."));
    } else {
        echo json_encode(array("message" => "Failed to update password."));
    }
} else {
    echo json_encode(array("message" => "Method not allowed."));
}
?>
