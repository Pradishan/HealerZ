<?php
require '../classes/DBconnector.php';
use classes\DBconnector;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $patientID = isset($_GET['patientID']) ? $_GET['patientID'] : null;

    if (!$patientID) {
        echo json_encode(array("message" => "Patient ID is required."));
        exit();
    }

    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();

    $sql = "SELECT Password FROM patient WHERE Patient_ID = :patientID LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":patientID", $patientID);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$result) {
        echo json_encode(array("message" => "Patient not found."));
        exit();
    }
    
    echo json_encode(array("Password" => $result['Password']));
} else {
    echo json_encode(array("message" => "Method not allowed."));
}
?>
