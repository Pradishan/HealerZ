<?php
header("Access-Control-Allow-Origin: *");

require_once '../../classes/DBconnector.php';

use classes\DBconnector;

$dbConnector = new DBconnector();

$method = $_SERVER['REQUEST_METHOD'];

try {
  $conn = $dbConnector->getConnection();
} catch (PDOException $ex) {
  die("ERROR: " . $ex->getMessage());
}

switch ($method) {
  case 'GET':
    $sql = "SELECT drug.*, druginventory.StockCount
        FROM drug
        INNER JOIN druginventory ON drug.Drug_ID = druginventory.Drug_ID
        WHERE druginventory.StockCount = 0 ;";
    break;
}

try {
  $stmt = $conn->prepare($sql);
  $stmt->execute();
  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $conn = null;

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
