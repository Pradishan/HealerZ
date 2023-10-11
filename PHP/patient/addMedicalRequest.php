<?php
// Enable CORS for all requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add 'Authorization' if you are using it in your requests

require '../classes/MedicalRequest.php';
use \classes\MedicalRequest;


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $startDate = $data["consultationDate"];
    $endDate = date('Y-m-d', strtotime($startDate. ' + '.($data['duration']).' days'));
    $medicalRequest = new MedicalRequest(null, $data["patientID"], null, $data["consultationDate"], $startDate, $endDate, $data["message"], "Requested");

    if ($medicalRequest->createRequest()) {
        $response = array("message" => "Medical request added successfully.");
        echo json_encode($response);
    } else {
        $response = array("error" => "Failed to add medical request.");
        echo json_encode($response);
    }
} else {
    $response = array("error" => "Invalid request method.");
    echo json_encode($response);
}
?>