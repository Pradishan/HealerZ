<?php
// login.php

require '../classes/DBconnector.php';
use \classes\DBconnector;

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

        $dbcon = new DBconnector();
        $conn = $dbcon->getConnection();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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




        // Prepare and execute the SQL INSERT query
        $stmt = $conn->prepare("INSERT INTO medicalrecord (Patient_ID,Doctor_ID,DateandTime,Patientcomplaint,OnExamination,Tests,Confirmeddiagnosis,Prescription_ID) VALUES ( :Patient_ID, :Doctor_ID, :DateandTime, :Patientcomplaint, :OnExamination, :Tests, :Confirmeddiagnosis, :Prescription_ID)");

        $stmt->bindParam(':Patient_ID', $patient_ID);
        $stmt->bindParam(':Doctor_ID', $doctor_ID);
        $stmt->bindParam(':DateandTime', $dateandTime);
        $stmt->bindParam(':Patientcomplaint', $patientcomplaint);
        $stmt->bindParam(':OnExamination', $onExamination);
        $stmt->bindParam(':Tests', $tests);
        $stmt->bindParam(':Confirmeddiagnosis', $confirmeddiagnosis);
        $stmt->bindParam(':Prescription_ID', $prescription_ID);

        $stmt->execute();

        // Return a success response to the front-end
        echo json_encode(['success' => true, 'message' => 'Data added successfully']);

    } catch (PDOException $e) {
        // Return an error response if something goes wrong
        echo json_encode(['success' => false, 'message' => 'Error adding data', 'error' => $e]);
    }
}


?>