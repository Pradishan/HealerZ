<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once "../classes/Patient.php";
use classes\Patient;

if (isset($_GET['patient_id'])) {
    $patient_id = $_GET['patient_id'];
    $patientData = Patient::searchPatientByID($patient_id);

    if ($patientData) {
        echo json_encode($patientData);
    } else {
        echo json_encode(["error" => "Patient not found"]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
?>
