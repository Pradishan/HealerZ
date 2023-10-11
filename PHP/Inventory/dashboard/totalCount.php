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

$query = "SELECT SUM(StockCount) as total FROM `druginventory`";
$query1 = "SELECT COUNT(StockCount) as countt FROM `druginventory`";

try {
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $conn->prepare($query1);
    $stmt->execute();
    $result1 = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && $result1) {
        $totalStockCount = $result['total'];
        $totalCount = $result1['countt'];
        $percentage = ($totalStockCount / ($totalCount * 1000)) * 100;
    } else {
        $percentage = 0;
    }

    echo json_encode(array('percentage' => $percentage));
} catch (PDOException $ex) {
    http_response_code(500);
    echo json_encode(array("message" => "Error: " . $ex->getMessage()));
}

$conn = null; 
