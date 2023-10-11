<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once '../classes/DBconnector.php';
use classes\DBconnector;

$dbConnector = new DBconnector();

try {
    $conn = $dbConnector->getConnection();
} catch (PDOException $ex) {
    die("ERROR: " . $ex->getMessage());
}

$drugIdsToUpdate = $_POST["Drug_ID"];
$updatedStockCounts = $_POST["StockCount"];

if (count($drugIdsToUpdate) !== count($updatedStockCounts)) {
    echo "Error: Mismatched array lengths";
    exit();
}

try {
    $conn->beginTransaction();

    $stmt = $conn->prepare("UPDATE druginventory SET StockCount = StockCount - :stockCount WHERE Drug_ID = :drugId");

    for ($i = 0; $i < count($drugIdsToUpdate); $i++) {
        $drugId = $drugIdsToUpdate[$i];
        $stockCount = $updatedStockCounts[$i];

        $stmt->bindParam(":stockCount", $stockCount, PDO::PARAM_INT);
        $stmt->bindParam(":drugId", $drugId, PDO::PARAM_INT);

        if (!$stmt->execute()) {
            throw new Exception("Error updating status: " . $stmt->errorInfo()[2]);
        }
    }

    $conn->commit();
    echo "Status Updated Successfully";
} catch (Exception $ex) {
    $conn->rollBack();
    http_response_code(500);
    echo "Error: " . $ex->getMessage();
}

$conn = null;
