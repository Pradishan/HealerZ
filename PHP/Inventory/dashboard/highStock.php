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

$query = "SELECT COUNT(Drug_ID) AS HighStockCount
          FROM druginventory
          WHERE StockCount > 800";

$result = $conn->query($query);
$hightotal = array();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hightotal['HighStockCount'] = $row['HighStockCount'];
} else {
    $hightotal['HighStockCount'] = 0;
}

echo json_encode($hightotal);

$conn->close();
?>
