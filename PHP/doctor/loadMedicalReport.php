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
        // Get the user ID from the request
        $patientID = $data['patient_ID'];


        // Prepare and execute the SQL query using named placeholders
        $stmt = $conn->prepare("SELECT * FROM medicalrecord WHERE Patient_ID = :patient_ID");
        $stmt->bindParam(':patient_ID', $patientID, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch the filtered data as an associative array
        $filteredData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return the filtered data as JSON
        header('Content-Type: application/json');
        echo json_encode($filteredData);
    }
} catch (Exception $e) {
    // Return an error response with the specific error message to the front-end
    echo json_encode(['success' => false, 'message' => 'Error fetching data: ' . $e->getMessage()]);
}

?>