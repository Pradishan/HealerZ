<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/DBconnector.php'; 
use classes\DBconnector;

$dbConnector = new DBconnector();
$conn = $dbConnector->getConnection();

if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['Drug_ID'])) {
    $drugID = $_GET['Drug_ID'];
    $query = "SELECT drug.*, druginventory.StockCount
    FROM drug
    INNER JOIN druginventory ON drug.Drug_ID = druginventory.Drug_ID
    WHERE drug.Drug_ID = :drugID";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(':drugID', $drugID, PDO::PARAM_INT);
    $stmt->execute();

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
}

$conn = null;
?>
