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
// $query = "SELECT COUNT(StockCount) as total FROM `druginventory` WHERE StockCount < 100 && StockCount!=0";
$query = "SELECT COUNT(druginventory.Drug_ID) AS LowStockCount
          FROM druginventory
          INNER JOIN drug ON druginventory.Drug_ID = drug.Drug_ID
          WHERE ((drug.Category = 'Tablet' AND druginventory.StockCount < 100)
             OR (drug.Category = 'Drops' AND druginventory.StockCount < 50)
             OR (drug.Category = 'Liquid' AND druginventory.StockCount < 70)
             OR (drug.Category = 'Capsules' AND druginventory.StockCount < 100)
             OR (drug.Category = 'Topical' AND druginventory.StockCount < 50)
             OR (drug.Category = 'Suppositories' AND druginventory.StockCount < 50)
             OR (drug.Category = 'Injections' AND druginventory.StockCount < 30)
             OR (drug.Category = 'Implants' AND druginventory.StockCount < 20))
          AND druginventory.StockCount != 0;";

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
