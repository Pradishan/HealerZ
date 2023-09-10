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

$query = "SELECT COUNT(Drug_ID) AS LowStockCount
          FROM druginventory
          WHERE StockCount < 100 && StockCount!=0";

$result = $conn->query($query);
$lowtotal = array();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $lowtotal['LowStockCount'] = $row['LowStockCount'];
} else {
    $lowtotal['LowStockCount'] = 0;
}

echo json_encode($lowtotal);

$conn->close();
?>
