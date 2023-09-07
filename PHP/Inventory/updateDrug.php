<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Healerz";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
        throw new Exception("Invalid request method. Only PUT requests are allowed.");
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['Drug_ID'])) {
        throw new Exception('Drug_ID is not provided in the request.');
    }

    $stmt = $conn->prepare("UPDATE drug SET Drug_Name = :Drug_Name, Category = :Category, Drug_dosage = :Drug_dosage, Descriptions = :Descriptions WHERE Drug_ID = :Drug_ID");
    $stmt->bindValue(':Drug_Name', $data['Drug_Name']);
    $stmt->bindValue(':Category', $data['Category']);
    $stmt->bindValue(':Drug_dosage', $data['Drug_dosage']);
    $stmt->bindValue(':Descriptions', $data['Descriptions']);
    $stmt->bindValue(':Drug_ID', $data['Drug_ID']);

    $stmt->execute();
    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        echo json_encode(array('message' => 'Drug updated successfully'));
    } else {
        echo json_encode(array('error' => 'Drug not found'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

