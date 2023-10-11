<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/Prescription.php';
use classes\Prescription; 

if (isset($_GET['Prescription_ID'])) {
    $prescriptionID = $_GET['Prescription_ID'];
    $data = Prescription::getPrescriptionDetails($prescriptionID);
    
    if ($data !== false) {
        echo json_encode($data);
    } else {
        http_response_code(500);
        echo "Error retrieving prescription data.";
    }
} else {
    echo json_encode(array());
}
?>
