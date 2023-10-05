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

    $drugIdsToUpdate = $_POST["Drug_ID"];;
    $updatedStockCount = $_POST["StockCount"];

 
    // for ($i = 0; $i < count($drugIdsToUpdate); $i++) {
    //     $drug_id = $drugIdsToUpdate[$i];
    //     $stock_count = $updatedStockCounts[$i];

        $stmt = $conn->prepare("UPDATE druginventory SET StockCount = StockCount - ? WHERE Drug_ID = ?");
        $stmt->bind_param("ii", $updatedStockCount, $drugIdsToUpdate );
       
        if ($stmt->execute()) {
            echo "Status Updated Successfully";
        } else {
            echo "Error updating status: " . $stmt->error;
        }
        $stmt->close();
    // }
}

mysqli_close($conn);
