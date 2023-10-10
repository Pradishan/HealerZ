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

$query = "SELECT COUNT(Drug_ID) AS OutOfStockCount
          FROM druginventory
          WHERE StockCount = 0";

try {
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $outofstock = array('OutOfStockCount' => $row['OutOfStockCount']);
    $conn = null; 

    echo json_encode($outofstock);
} catch (PDOException $ex) {
    http_response_code(500);
    echo json_encode(array("message" => "Error: " . $ex->getMessage()));
}
