<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once "../classes/Drug.php";

use classes\Drug;

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
try {
    if (!isset($_GET['Drug_ID'])) {
        throw new Exception('Drug_ID is not provided in the request.');
    }
    $drugId = $_GET['Drug_ID']; 
    $drug=new Drug($drugId, null, null, null, null);
    $res = $drug->deleteDrug();
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        echo json_encode(array('message' => 'Drug deleted successfully'));
    } else {
        echo json_encode(array('error' => 'Drug not found'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
} else {
    $response = array("message" => "Invalid request method.");
    echo json_encode($response);
  
}
