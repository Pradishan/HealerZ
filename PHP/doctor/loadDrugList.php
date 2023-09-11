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
        if (isset($data['patient_ID'])) {
            $patient_ID = $data['patient_ID'];

            // Call the displayDrugs method to get the data
            $filteredData = Prescription::displayDrugs($patient_ID);

            // Check if any data was found for the given Patient_ID
            if ($filteredData) {
                // Return the filtered data as JSON
                header('Content-Type: application/json');
                echo json_encode($filteredData);
            } else {
                // If no data found for the given Patient_ID, return an appropriate response
                echo json_encode(['message' => 'No drugs found for this patient']);
            }
        } else {
            // If 'patient_ID' is not provided in the JSON data, return an error message or appropriate response
            echo json_encode(['message' => 'Missing patient_ID in the request']);
        }
    }
} catch (Exception $e) {
    // Return an error response with the specific error message to the front-end
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['success' => false, 'message' => 'Error fetching data: ' . $e->getMessage()]);
}
?>