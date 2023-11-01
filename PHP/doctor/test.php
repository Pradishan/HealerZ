<?php
// login.php

require '../classes/Prescription.php';
use classes\Prescription;



// Enable CORS for all requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add 'Authorization' if you are using it in your requests

try {
    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Assume your front-end sends data as JSON
        $data = json_decode(file_get_contents('php://input'), true);

        // Check if 'patient_ID' is provided in the JSON data 
        if (isset($data['Prescription_list_ID'])) {
            $Prescription_list_ID = $data['Prescription_list_ID'];
            $Patient_ID = $data['Patient_ID'];
            $TDS = $data['tds'];
            $Time = $data['time'];
            $Days = $data['days'];

            // Check if any data was found for the given Patient_ID
            if (Prescription::updateDrug($Prescription_list_ID, $Patient_ID, $TDS, $Time, $Days)) {
                echo json_encode(['success' => true, 'message' => 'Drug updated']);
            } else {
                // If no data found for the given Patient_ID, return an appropriate response
                echo json_encode(['message' => 'No drug found']);
            }
        } else {
            // If 'patient_ID' is not provided in the JSON data, return an error message or appropriate response
            echo json_encode(['message' => 'Missing prescrption_list_ID in the request']);
        }
    }
} catch (Exception $e) {
    // Return an error response with the specific error message to the front-end
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['success' => false, 'message' => 'Error fetching data: ' . $e->getMessage()]);
}
?>