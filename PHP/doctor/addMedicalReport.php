<?php

require '../classes/Medicalrecord.php';
require '../classes/Prescription.php';
use classes\Medicalrecord;
use classes\Prescription;

// Enable CORS for all requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add 'Authorization' if you are using it in your requests

// Create a new MySQL connection using DBconnector class
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    // Handle the preflight request and return the allowed methods
    http_response_code(200);
    exit();
}

$method = $_SERVER["REQUEST_METHOD"];

// Login API endpoint
if ($method === "POST") {

    try {
        // Front-end sends data as JSON
        $data = json_decode(file_get_contents('php://input'), true);

        $currentDateTime = date("Y-m-d H:i:s");

        $patient_ID = $data['patient_ID'];
        $doctor_ID = $data['doctor_ID'];
        $dateandTime = $currentDateTime;
        $patientcomplaint = $data['patientcomplaint'];
        $onExamination = $data['onExamination'];
        $tests = $data['tests'];
        $confirmeddiagnosis = $data['confirmeddiagnosis'];

       
        $min_range = 1000000000; 
        $max_range = 9999999999;
        $prescription_ID = mt_rand($min_range, $max_range);
       
        $filteredData = Prescription::displayDrugs($patient_ID);

        if ($filteredData) {
           
            if (!Prescription::addPrescription($prescription_ID, $patient_ID, $doctor_ID, 'Waiting', $dateandTime)) {
                echo json_encode(['success' => false, 'message' => 'error in prescription record adding']);
                exit;
            }
        }

        // Create a new medical record
        $record = new Medicalrecord($patient_ID, $doctor_ID, $dateandTime, $patientcomplaint, $onExamination, $tests, $confirmeddiagnosis, $prescription_ID);

        if ($record->addMedicalrecord()) {
            if ($prescription_ID !== null) {
                if (Prescription::setPrescription_ID($patient_ID, $prescription_ID)) {
                    echo json_encode(['success' => true, 'message' => 'successfully sent prescription', 'prescription_ID' => $prescription_ID]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'error in prescription sending']);
                }
            } else {
                // Prescription ID is null, no prescription data to add
                echo json_encode(['success' => true, 'message' => 'Medical report added, no prescription', 'prescription_ID' => null]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'error in medical record adding']);
        }

    } catch (PDOException $e) {
        // Return an error response if something goes wrong
        echo json_encode(['success' => false, 'message' => 'Error adding data', 'error' => $e->getMessage()]);
    }
}

?>
