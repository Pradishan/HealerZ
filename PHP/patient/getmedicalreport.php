<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once "../classes/MedicalRequest.php";

use classes\MedicalRequest;
$patientID = $_GET['patientID'];
$result = MedicalRequest::getApprovedMedicalRequests($patientID);
header('Content-Type: application/json');
echo json_encode($result);

?>
