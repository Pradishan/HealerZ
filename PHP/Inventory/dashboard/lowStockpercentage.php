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
$query = "SELECT COUNT(druginventory.StockCount) AS total
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
