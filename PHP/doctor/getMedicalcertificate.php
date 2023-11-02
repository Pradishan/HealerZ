<?php

require '../classes/MedicalReport.php';
require '../classes/MedicalRequest.php';

use classes\MedicalReport;
use classes\MedicalRequest;


// Enable CORS for all requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add 'Authorization' if you are using it in your requests

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    // Handle the preflight request and return the allowed methods
    http_response_code(200);
    exit();
}

$method = $_SERVER["REQUEST_METHOD"];

// API endpoint for handling medical report requests
if ($method === "POST") {
    try {
        // Front-end sends data as JSON
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['Requset_ID']) || !isset($data['patient_ID'])) {
            echo json_encode(['success' => false, 'message' => 'Invalid request data']);
            http_response_code(400); // Bad Request
            exit;
        }

        $Report_ID = null;
        $Requset_ID = $data['Requset_ID'];
        $patient_ID = $data['patient_ID'];


        $Report_ID = MedicalReport::isReportForRequest($Requset_ID);


            if ($Report_ID) {
                $filteredData = MedicalReport::getReportById($Report_ID);
                if ($filteredData) {
                    // Return the filtered data as JSON
                    header('Content-Type: application/json');
                    echo json_encode($filteredData);
                } else {
                    // If no data found for the given Patient_ID, return an error message or appropriate response
                    echo json_encode(['message' => 'Patient not found']);
                }
            }else{

                $data = MedicalRequest::getRequestById($Request_ID);
                $StartDate = $data->row['StartDate'];
                $EndDate = $data->row['EndDate'];
                $Message = 'test';
            }

    } catch (PDOException $e) {
        // Log the error
        error_log("Error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Internal Server Error']);
        http_response_code(500); // Internal Server Error
    } 
}
?>
