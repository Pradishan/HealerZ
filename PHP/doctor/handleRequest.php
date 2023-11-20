<?php

require '../classes/MedicalReport.php';
require '../classes/MedicalRequest.php';
use classes\MedicalReport;
use classes\MedicalRequest;

// Enable CORS for all requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add 'Authorization' if you are using it in your requests

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    // Handle the preflight request and return the allowed methods
    http_response_code(200);
    exit();
}

$method = $_SERVER["REQUEST_METHOD"];

// API endpoint for handling medical report requests
if ($method === "PUT") {
    try {
        // Front-end sends data as JSON
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['Request_ID']) || !isset($data['patient_ID']) || !isset($data['Doctor_ID']) || !isset($data['startDate']) || !isset($data['endDate']) || !isset($data['Message']) || !isset($data['status'])) {
            echo json_encode(['success' => false, 'message' => 'Invalid request data', 'data' => $data]);
            // http_response_code(400); // Bad Request
            exit();
        }

        $currentDateTime = date("Y-m-d H:i:s");
        $Report_ID = null;
        $Request_ID = $data['Request_ID'];
        $patient_ID = $data['patient_ID'];
        $Doctor_ID = $data['Doctor_ID'];
        $IssueDate = $currentDateTime;
        $startDate = $data['startDate'];
        $endDate = $data['endDate'];
        $message = $data['Message'];
        $status = $data['status'];
        $Doctor_name = $data['Doctor_name'];
        $Patient_Name = $data['Patient_Name'];

        $Report_ID = MedicalReport::isReportForRequest($Request_ID);
        if (MedicalRequest::handleRequest($status, $Request_ID, $Doctor_ID) == true) {
            if ($Report_ID) {
                MedicalReport::deleteMedicalreport($Report_ID);
            }
            if ($status == 'Approved') {
                $Report_ID = $patient_ID . "_" . time();
                $report = new MedicalReport($Report_ID, $Request_ID, $patient_ID, $Doctor_ID, $IssueDate, $startDate, $endDate, $message, $Doctor_name, $Patient_Name);
                if ($report->createReport()) {
                    echo json_encode(['success' => true, 'message' => 'Request Approved']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Error in creating medical report']);
                }
            } else {
                echo json_encode(['success' => true, 'message' => 'Request Rejected']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Error in medical request handling']);
        }
    } catch (PDOException $e) {
        // Log the error
        error_log("Error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Internal Server Error']);
        http_response_code(500); // Internal Server Error
    }
}
?>