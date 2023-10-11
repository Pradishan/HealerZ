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

// $query = "SELECT COUNT(Drug_ID) AS HighStockCount
//           FROM druginventory
//           WHERE StockCount > 800";

$query = "SELECT COUNT(druginventory.Drug_ID) AS HighStockCount
          FROM druginventory
          INNER JOIN drug ON druginventory.Drug_ID = drug.Drug_ID
          WHERE ((drug.Category = 'Tablet' AND druginventory.StockCount > 800)
               OR (drug.Category = 'Drops' AND druginventory.StockCount > 300)
               OR (drug.Category = 'Liquid' AND druginventory.StockCount > 600)
               OR (drug.Category = 'Capsules' AND druginventory.StockCount > 700)
               OR (drug.Category = 'Topical' AND druginventory.StockCount > 200)
               OR (drug.Category = 'Suppositories' AND druginventory.StockCount > 200)
               OR (drug.Category = 'Injections' AND druginventory.StockCount > 300)
               OR (drug.Category = 'Implants' AND druginventory.StockCount > 150))
          AND druginventory.StockCount != 0;";

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
