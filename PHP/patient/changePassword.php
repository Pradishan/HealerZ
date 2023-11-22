<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../classes/DBconnector.php';
use classes\DBconnector;


$con = new DBconnector();
$conn = $con->getConnection();

if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);

    $patientID = isset($data['patientID']) ? $data['patientID'] : null;
    $newPassword = isset($data['newPassword']) ? $data['newPassword'] : null;

    if (!$patientID || !$newPassword) {
        echo json_encode(array("message" => "patientID and new password are required."));
        exit();
    }

    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    $sql = "UPDATE patient SET Password = :hashedPassword WHERE Patient_ID = :patientID";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":hashedPassword", $hashedPassword);
    $stmt->bindParam(":patientID", $patientID);

    $res = $stmt->execute();

    if ($res) {
        echo json_encode(array("message" => "Password updated successfully."));
    } else {
        echo json_encode(array("message" => "Failed to update password."));
    }
} else {
    echo json_encode(array("message" => "Method not allowed."));
}

