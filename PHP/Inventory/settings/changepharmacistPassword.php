<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../../classes/DBconnector.php';
use classes\DBconnector;


$con = new DBconnector();
$conn = $con->getConnection();

try {    
    if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
        throw new Exception("Invalid request method. Only PUT requests are allowed.");
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['employee_ID'])) {
        throw new Exception('Pharmacist_ID is not provided in the request.');
    }

    $stmt = $conn->prepare("UPDATE employee SET Password = :Password WHERE employee_ID = :employee_ID");
    $stmt->bindValue(':employee_ID', $data['employee_ID']);
    $stmt->bindValue(':Password', $data['Password']);

    $stmt->execute();
    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        echo json_encode(array('message' => 'Password changed successfully'));
    } else {
        echo json_encode(array('error' => 'Pharmacist not found'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

