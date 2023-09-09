<?php

require '../classes/Medicalrecord.php';
use classes\Medicalrecord;

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
   //front-end sends data as JSON
        $data = json_decode(file_get_contents('php://input'), true);

        $patient_ID = $data['patient_ID'];
        $doctor_ID = $data['doctor_ID'];
        $dateandTime = $data['dateandTime'];
        $patientcomplaint = $data['patientcomplaint'];
        $onExamination = $data['onExamination'];
        $tests = $data['tests'];
        $confirmeddiagnosis = $data['confirmeddiagnosis'];
        $prescription_ID = $data['prescription_ID'];


        $record = new Medicalrecord($patient_ID,$doctor_ID,$dateandTime,$patientcomplaint,$onExamination,$tests,$confirmeddiagnosis,$prescription_ID);
    if ($record->addMedicalrecord()) {
        echo json_encode(['success' => true, 'message' => 'Data added successfully']);
    }
    } catch (PDOException $e) {
        // Return an error response if something goes wrong
        echo json_encode(['success' => false, 'message' => 'Error adding data', 'error' => $e]);
    }
}


?>