<?php
// login.php

require '../classes/DBconnector.php';
use \classes\DBconnector;

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
        if (isset($data['MedicalRequest_ID'])) {
            // Get the patient ID from the request
            $MedicalRequest_ID = $data['MedicalRequest_ID'];

            // Prepare and execute the SQL query using positional parameter
            $stmt = $conn->prepare("SELECT medicalrequest.*, patient.Patient_ID, patient.PatientName, patient.DateOfBirth, patient.PhoneNo, patient.Email, patient.Address, patient.BloodGroup, patient.Profile FROM medicalrequest INNER JOIN patient ON medicalrequest.Patient_ID = patient.Patient_ID WHERE medicalrequest.MedicalRequest_ID = ?");
            $stmt->execute([$MedicalRequest_ID]); // Use execute with an array of parameters

            // Fetch the filtered data as an associative array
            $filteredData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($filteredData) {
                header('Content-Type: application/json');

                $imagePath = $filteredData[0]['Profile']; // Assume Profile contains the relative image path

                if (file_exists($imagePath)) {
                    $imageData = file_get_contents($imagePath);
                    $imageType = mime_content_type($imagePath);

                    $base64 = base64_encode($imageData);

                    $filteredData[0]['Profile'] = $base64;
                    $filteredData[0]['ProfileType'] = $imageType;
                }

                echo json_encode($filteredData);
            } else {
                echo json_encode(['message' => 'Patient not found']);
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