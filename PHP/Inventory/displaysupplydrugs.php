<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Healerz";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['Prescription_ID'])) {
    $prescriptionID = $_GET['Prescription_ID']; 
    // $query = "SELECT * FROM prescription_list WHERE Prescription_ID = '$prescriptionID'";
    $query = "SELECT prescription_list.*, druginventory.StockCount 
    FROM prescription_list
    LEFT JOIN druginventory ON prescription_list.Drug_ID = druginventory.Drug_ID 
    WHERE Prescription_ID = '$prescriptionID'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo json_encode(array()); 
    }
} else {
    echo json_encode(array());
}

$conn->close();
?>
