<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/Prescription.php'; 
use classes\Prescription; 

if (isset($_GET['id'])) {
    $prescriptionID = filter_var($_GET['id']);
    $result = Prescription::deletePrescription($prescriptionID);

    if ($result) {
        echo json_encode(array('message' => 'Prescription deleted successfully'));
    } else {
        echo json_encode(array('message' => 'Failed to delete Prescription'));
    }
} else {
    echo json_encode(array('message' => 'Missing Prescription_ID'));
}
?>
