<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once '../../classes/DBconnector.php';
use classes\DBconnector;

$dbConnector = new DBconnector();

try {
    $conn = $dbConnector->getConnection();
} catch (PDOException $ex) {
    die("ERROR: " . $ex->getMessage());
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

try {
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $hightotal = array('HighStockCount' => $row['HighStockCount']);
    echo json_encode($hightotal);
} catch (PDOException $ex) {
    http_response_code(500);
    echo json_encode(array("message" => "Error: " . $ex->getMessage()));
}

$conn = null; 
