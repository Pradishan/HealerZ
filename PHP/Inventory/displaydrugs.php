<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/DBconnector.php';
use classes\DBconnector;
$dbConnector = new DBconnector();

$conn = $dbConnector->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

if (!$conn) {
    die("Connection failed: " . $conn->errorInfo());
}

switch ($method) {
    case 'GET':
        $sql = "SELECT drug.*, druginventory.StockCount 
        FROM drug
        LEFT JOIN druginventory ON drug.Drug_ID = druginventory.Drug_ID";
        break;
}

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(404);
    die($conn->errorInfo());
}

if ($method == 'GET') {
    if ($stmt->execute()) {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    } else {
        http_response_code(500);
        echo "Error executing the query: " . $stmt->errorInfo();
    }
} else {
    echo "Unsupported request method.";
}

$conn = null;
?>
