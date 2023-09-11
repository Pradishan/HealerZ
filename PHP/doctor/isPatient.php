<?php
// login.php

require '../classes/DBconnector.php';
require '../classes/Patient.php';
use classes\DBconnector;
use classes\Patient;

// Enable CORS for all requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add 'Authorization' if you are using it in your requests

try {
    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Assume your front-end sends data as JSON
        $data = json_decode(file_get_contents('php://input'), true);

        // Check if 'patient_ID' is provided in the JSON data
        if (isset($data['patient_ID'])) {
            // Get the patient ID from the request
            $patientID = $data['patient_ID'];

            // Call your function to check if the patient ID exists
            $filteredData = Patient::isPatientID($patientID);

            if ($filteredData) {
                // If patient ID exists, send a success response with the data
                header('Content-Type: application/json');
                echo json_encode(['success' => true, 'data' => $filteredData]);
            } else {
                // If patient ID does not exist, send a not found response
                header('HTTP/1.1 404 Not Found');
                echo json_encode(['success' => false, 'message' => 'Patient not found']);
            }
        } else {
            // If 'patient_ID' is not provided in the JSON data, return an error message
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(['success' => false, 'message' => 'Missing patient_ID in the request']);
        }
    }
} catch (Exception $e) {
    // Return an error response with the specific error message to the front-end
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['success' => false, 'message' => 'Error fetching data: ' . $e->getMessage()]);
}

?>