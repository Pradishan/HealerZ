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

try {
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $lowtotal = array('LowStockCount' => $row['LowStockCount']);
    echo json_encode($lowtotal);
} catch (PDOException $ex) {
    http_response_code(500);
    echo json_encode(array("message" => "Error: " . $ex->getMessage()));
}

$conn = null; 
