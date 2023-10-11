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
        $percentage = ($totalStockCount / $totalCount) * 100;
    } else {
        $percentage = 0;
    }

    echo json_encode(array('percentage' => $percentage));
} catch (PDOException $ex) {
    http_response_code(500);
    echo json_encode(array("message" => "Error: " . $ex->getMessage()));
}

$conn = null; 
