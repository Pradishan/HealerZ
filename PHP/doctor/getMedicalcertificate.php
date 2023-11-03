<?php
require '../classes/MedicalReport.php';
require '../classes/MedicalRequest.php';
require '../classes/Employee.php';
require '../classes/Patient.php';

use classes\MedicalReport;
use classes\MedicalRequest;
use classes\Employee;
use classes\Patient;

// Enable CORS for all requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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

        if (!isset($data['Request_ID']) || !isset($data['patient_ID'])) {
            echo json_encode(['success' => false, 'message' => 'Invalid request data']);
            http_response_code(400); // Bad Request
            exit;
        }

        $Request_ID = $data['Request_ID'];
        $patient_ID = $data['patient_ID'];
        $Doctor_ID = $data['Doctor_ID'];
        $currentDateTime = date("Y-m-d H:i:s");

        $Report_ID = MedicalReport::isReportForRequest($Request_ID);

        if ($Report_ID) {
            $filteredData = MedicalReport::getReportById($Report_ID);
            if ($filteredData) {
                $data = [
                    'Report_ID' => $filteredData['Report_ID'],
                    'MedicalRequest_ID' => $filteredData['MedicalRequest_ID'],
                    'patient_ID' => $filteredData['patient_ID'],
                    'Doctor_ID' => $filteredData['Doctor_ID'],
                    'IssueDate' => $filteredData['IssueDate'],
                    'StartDate' => $filteredData['StartDate'],
                    'EndDate' => $filteredData['EndDate'],
                    'Message' => $filteredData['Message'],
                    'Doctor_name' => $filteredData['Doctor_Name'],
                    'Patient_Name' => $filteredData['Patient_Name'],
                    'State' => MedicalRequest::getStatusById($Request_ID),
                ];

                header('Content-Type: application/json');
                echo json_encode($data);
            } else {
                echo json_encode(['message' => 'Report not found']);
            }
        } else {
            $filteredData = MedicalRequest::getRequestById($Request_ID);
            $IssueDate = $currentDateTime;
            $StartDate = $filteredData['StartDate'];
            $EndDate = $filteredData['EndDate'];
            $Message = 'enter message here';
            $Doctor_name = Employee::getNameById($Doctor_ID);
            $Patient_Name = Patient::getNameById($patient_ID);

            $data = [
                'Request_ID' => $Request_ID,
                'StartDate' => $StartDate,
                'EndDate' => $EndDate,
                'Message' => $Message,
                'Doctor_name' => $Doctor_name['employee_Name'],
                'Patient_Name' => $Patient_Name['PatientName'],
                'State' => MedicalRequest::getStatusById($Request_ID),

            ];

            header('Content-Type: application/json');
            echo json_encode($data);
        }
    } catch (PDOException $e) {
        // Log the error
        error_log("Error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Internal Server Error']);
        http_response_code(500); // Internal Server Error
    }
}
?>