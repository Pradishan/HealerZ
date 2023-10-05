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

    foreach ($drugIdsToUpdate as $drug_id) {
        $sql = "UPDATE druginventory SET StockCount = StockCount - $updatedStockCount WHERE Drug_ID = $drug_id";
        $res = mysqli_query($conn, $sql);
    }

    if ($res) {
        echo "Stock Updated Successfully";
    } else {
        echo "error";
    }
}
