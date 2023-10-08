<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../classes/Patient.php";
require_once "../classes/DBconnector.php";
use classes\DBconnector;
use classes\Patient;

try {
    $db = new DBconnector();
    $conn = $db->getConnection();

    if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
        throw new Exception("Invalid request method. Only PUT requests are allowed.");
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['Patient_ID'])) {
        throw new Exception('Patient_ID is not provided in the request.');
    }
    
    $patient = new Patient(
        $data['Patient_ID'],
        $data['PatientName'],
        $data['DateOfBirth'],
        $data['Gender'],
        $data['PhoneNo'],
        $data['Email'],
        $data['Address'],
        $data['BloodGroup'],
        $data['Password']

    );
   
    $result = $patient->updatePatient();
    
    if ($result) {
        echo json_encode(array('message' => 'Patient updated successfully'));
    } else {
        echo json_encode(array('error' => 'Patient not found or update failed'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

