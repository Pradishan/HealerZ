<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../classes/Drug.php";
require_once "../classes/DBconnector.php";
use classes\DBconnector;
use classes\Drug;

try {
    $db = new DBconnector();
    $conn = $db->getConnection();

    if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
        throw new Exception("Invalid request method. Only PUT requests are allowed.");
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['Drug_ID'])) {
        throw new Exception('Drug_ID is not provided in the request.');
    }
    
    $drug = new Drug(
        $data['Drug_ID'],
        $data['Drug_Name'],
        $data['Category'],
        $data['Drug_dosage'],
        $data['Descriptions']
    );
   
    $result = $drug->updateDrug();
    
    if ($result) {
        echo json_encode(array('message' => 'Drug updated successfully'));
    } else {
        echo json_encode(array('error' => 'Drug not found or update failed'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

?>