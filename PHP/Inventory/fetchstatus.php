<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/Prescription.php'; 
use classes\Prescription;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $prescriptionID = $_POST["Prescription_ID"];
    $status = 'Delivered';
    
    $result = Prescription::updatePrescriptionStatus($prescriptionID, $status);

    echo $result;
} else {
    echo "Invalid request method.";
}
?>
