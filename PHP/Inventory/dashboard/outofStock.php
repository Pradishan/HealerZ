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

$query = "SELECT COUNT(Drug_ID) AS OutOfStockCount
          FROM druginventory
          WHERE StockCount = 0";

$result = $conn->query($query);
$outofstock = array();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $outofstock['OutOfStockCount'] = $row['OutOfStockCount'];
} else {
    $outofstock['OutOfStockCount'] = 0;
}

echo json_encode($outofstock);

$conn->close();
?>
