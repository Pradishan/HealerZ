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

$query = "SELECT COUNT(StockCount) as total FROM `druginventory` WHERE StockCount > 800";
$query1 = "SELECT COUNT(StockCount) as countt FROM `druginventory`";
$result = $conn->query($query);
$result1 = $conn->query($query1);
$data = array();
$data1 = array();

if (!$result || !$result1) { 
    die("Query failed: " . $conn->error);
}

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
while ($row = $result1->fetch_assoc()) {
    $data1[] = $row;
}

if (!empty($data) && !empty($data1)) {
    $totalStockCount = $data[0]['total'];
    $totalCount = $data1[0]['countt'];
    $percentage = ($totalStockCount /$totalCount) * 100;
} else {
    $percentage = 0;
}

echo json_encode(array('percentage' => $percentage));

$conn->close();
?>
