<?php
require '../../classes/DBconnector.php';
use classes\DBconnector;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $employeeID = isset($_GET['employeeID']) ? $_GET['employeeID'] : null;

    if (!$employeeID) {
        echo json_encode(array("message" => "Employee ID is required."));
        exit();
    }

    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();

    $sql = "SELECT Password FROM employee WHERE employee_ID = :employeeID LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":employeeID", $employeeID);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$result) {
        echo json_encode(array("message" => "Employee not found."));
        exit();
    }
    
    echo json_encode(array("Password" => $result['Password']));
} else {
    echo json_encode(array("message" => "Method not allowed."));
}
?>
