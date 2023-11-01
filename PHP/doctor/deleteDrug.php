<?php

require '../classes/Prescription.php';
use classes\Prescription;

// Enable CORS for all requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add 'Authorization' if you are using it in your requests

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    header("HTTP/1.1 204 No Content");
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Assume your front-end sends data as JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if 'Prescription_list_ID' is provided in the JSON data
    if (isset($data['Prescription_list_ID'])) {
        $Prescription_list_ID = $data['Prescription_list_ID'];

        // Check if any data was found for the given Prescription_list_ID
        if (Prescription::deleteDrug($Prescription_list_ID)) {
            echo json_encode(['success' => true, 'message' => 'Drug deleted']);
        } else {
            // If no data found for the given Prescription_list_ID, return an appropriate response
            echo json_encode(['message' => 'No drug found']);
        }
    } else {
        // If 'Prescription_list_ID' is not provided in the JSON data, return an error message or appropriate response
        echo json_encode(['message' => 'Missing prescription_list_ID in the request']);
    }
} else {
    // Handle unsupported request methods
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(['message' => 'Method not allowed']);
}
