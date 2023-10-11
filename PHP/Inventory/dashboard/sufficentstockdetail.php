<?php
header("Access-Control-Allow-Origin: *");

require_once '../../classes/DBconnector.php';
use classes\DBconnector;

$dbConnector = new DBconnector();

try {
    $conn = $dbConnector->getConnection();
} catch (PDOException $ex) {
    die("ERROR: " . $ex->getMessage());
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // $sql = "SELECT drug.*, druginventory.StockCount
        // FROM drug
        // INNER JOIN druginventory ON drug.Drug_ID = druginventory.Drug_ID
        // WHERE drug.Drug_ID AND druginventory.StockCount > 800 ;";
        $sql = "SELECT drug.*, druginventory.StockCount
         FROM drug
         INNER JOIN druginventory ON drug.Drug_ID = druginventory.Drug_ID
           WHERE ((drug.Category = 'Tablet' AND druginventory.StockCount > 800)
               OR (drug.Category = 'Drops' AND druginventory.StockCount > 300)
               OR (drug.Category = 'Liquid' AND druginventory.StockCount > 600)
               OR (drug.Category = 'Capsules' AND druginventory.StockCount > 700)
               OR (drug.Category = 'Topical' AND druginventory.StockCount > 200)
               OR (drug.Category = 'Suppositories' AND druginventory.StockCount > 200)
               OR (drug.Category = 'Injections' AND druginventory.StockCount > 300)
               OR (drug.Category = 'Implants' AND druginventory.StockCount > 150))
           AND druginventory.StockCount != 0;";
        break;
}

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($results) {
        header('Content-Type: application/json');
        echo json_encode($results);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "No records found."));
    }
} catch (PDOException $ex) {
    http_response_code(500);
    echo json_encode(array("message" => "Error: " . $ex->getMessage()));
}

$conn = null; 
