<?php

require '../classes/Prescription.php';
require '../classes/Drug.php';
use classes\Drug;
use classes\Prescription;

// Enable CORS for requests from http://localhost:3000
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add 'Authorization' if you are using it in your requests

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    // Handle the preflight request and return the allowed methods
    header("HTTP/1.1 200 OK");
    exit();
}


$method = $_SERVER["REQUEST_METHOD"];

// Login API endpoint
if ($method === "POST") {

    try {
        // Front-end sends data as JSON
        $data = json_decode(file_get_contents('php://input'), true);

    

        $patient_ID = $data['patient_ID'];
        $drug_Name = $data['drug']; 
        $doctor_ID = $data['doctor_ID'];
        $tds = "1+1+1"; 
        $time = "Atfer Meal"; 
        $days = 3; 

        // Get the drug ID based on the drug name
        $drug_ID = Drug::getDrugIDbyName($drug_Name);

        if ($drug_ID !== null) {
            $drug = new Prescription($patient_ID, $drug_ID, $doctor_ID, $tds, $time, $days);
            if ($drug->addDrug()) {
                echo json_encode(['success1' => true, 'message' => 'Data added successfully']);
            } else {
                echo json_encode(['success1' => false, 'message' => 'Error adding data']);
            }
        } else {
            echo json_encode(['success1' => false, 'message' => 'Drug not found']);
        }
    } catch (PDOException $e) {
        // Return an error response if something goes wrong
        echo json_encode(['success1' => false, 'message' => 'Error adding data', 'error' => $e->getMessage()]);
    }

}


?>