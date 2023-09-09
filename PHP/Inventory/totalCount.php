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

$query = "SELECT SUM(StockCount) as total FROM `druginventory`";
$result = $conn->query($query);
$data = array();

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

if (!empty($data)) {
    $totalStockCount = $data[0]['total'];
    $percentage = ($totalStockCount / 30000) * 100;
} else {
    $percentage = 0;
}

echo json_encode(array('percentage' => $percentage));

$conn->close();
?>
