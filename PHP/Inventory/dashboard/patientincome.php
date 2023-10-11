<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
$host = "localhost";
$username = "root";
$password = "";
$database = "healerz"; 

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT MONTH(TimeP) AS Month, COUNT(*) AS RecordCount FROM prescription_record GROUP BY Month";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo "No data found";
}

$conn->close();
?>
