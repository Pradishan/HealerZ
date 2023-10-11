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

$sql = "SELECT Category, COUNT(*) as count FROM drug GROUP BY Category";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    $totalCount = 0;

    while ($row = $result->fetch_assoc()) {
        $totalCount += $row['count'];
    }
  
    $result->data_seek(0);

    while ($row = $result->fetch_assoc()) {
        $percentage = ($row['count'] / $totalCount) * 100;
        $row['percentage'] = $percentage; 
        $data[] = $row;
    }

    echo json_encode($data);
} else {
    echo "No data found";
}

$conn->close();
?>
