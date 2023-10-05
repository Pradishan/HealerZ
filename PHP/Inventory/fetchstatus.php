<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Healerz";

$conn = new mysqli($servername, $username, $password, $dbname);

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {

    $prescription_id = $_POST["Prescription_ID"];
    $status = 'Delivered';

        $stmt = $conn->prepare("UPDATE prescription_record SET status = ? WHERE Prescription_ID = ?");
        $stmt->bind_param("ss", $status, $prescription_id);
       
        if ($stmt->execute()) {
            echo "Status Updated Successfully";
        } else {
            echo "Error updating status: " . $stmt->error;
        }
        $stmt->close();
  
}

mysqli_close($conn);







