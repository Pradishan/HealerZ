<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/DBconnector.php';

$dbConnector = new classes\DBconnector();

$conn = $dbConnector->getConnection();

if (!$conn) {
    die("Connection failed: " . $conn->errorInfo());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $drug_id = $_POST["Drug_ID"];
    $drug_stk = $_POST["StockCount"];
    
    $query = "UPDATE druginventory SET StockCount = :drug_stk WHERE Drug_ID = :drug_id";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':drug_stk', $drug_stk, PDO::PARAM_INT);
    $stmt->bindParam(':drug_id', $drug_id, PDO::PARAM_INT);
   
    if ($stmt->execute()) {
        echo "Item Updated Successfully";
    } else {
        echo "Error updating item: " . $stmt->errorInfo()[2];
    }
} else {
    echo "Invalid request method.";
}

$conn = null;
?>
