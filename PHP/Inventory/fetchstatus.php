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
    // Check if "Prescription_ID" is set in the POST data
    if (isset($_POST["Prescription_ID"])) {
        // Retrieve Prescription_ID from the request
        $prescription_id = mysqli_real_escape_string($conn, $_POST["Prescription_ID"]);

        // Update the status to "Delivered"
        $status = "Delivered";
        $sql = "UPDATE prescription_record SET status = '$status' WHERE Prescription_ID = $prescription_id";

        if (mysqli_query($conn, $sql)) {
            echo "Status Updated Successfully";
        } else {
            echo "Error updating status: " . mysqli_error($conn);
        }
    } else {
        echo "Prescription_ID is not set in the POST data";
    }
}

mysqli_close($conn);
?>
