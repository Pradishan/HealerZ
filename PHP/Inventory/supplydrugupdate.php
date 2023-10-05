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
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    if ($data === null) {
        echo "JSON decoding error";
        exit;
    }

    $drugIdsToUpdate = $data["DrugIDs"];
    $updatedStockCount = $data["StockCount"];

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
