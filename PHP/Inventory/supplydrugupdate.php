<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Healerz";

$conn = new mysqli($servername, $username, $password, $dbname);

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    $drugIdsToUpdate = $_POST["Drug_ID"];
    $updatedStockCounts = $_POST["StockCount"];
    if (count($drugIdsToUpdate) !== count($updatedStockCounts)) {
        echo "Error: Mismatched array lengths";
        exit();
    }
    $stmt = $conn->prepare("UPDATE druginventory SET StockCount = StockCount - ? WHERE Drug_ID = ?");

    if (!$stmt) {
        echo "Error preparing statement: " . $conn->error;
        exit();
    }
    $conn->begin_transaction();
    for ($i = 0; $i < count($drugIdsToUpdate); $i++) {
        $drugId = $drugIdsToUpdate[$i];
        $stockCount = $updatedStockCounts[$i];
  
        $stmt->bind_param("ii", $stockCount, $drugId);
        if (!$stmt->execute()) {
            echo "Error updating status: " . $stmt->error;
            $conn->rollback(); 
            exit();
        }
    }
    $conn->commit();
    $stmt->close();

    echo "Status Updated Successfully";
}

mysqli_close($conn);
?>
