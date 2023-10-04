


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
    $drug_id = $_POST["Drug_ID"];
    $updated_stock_count = $_POST["StockCount"];


    $sql = "UPDATE druginventory SET StockCount = StockCount - $updated_stock_count WHERE Drug_ID = $drug_id";
    $res = mysqli_query($conn, $sql);

    if ($res) {
        echo "Item Added Succesfully";
    } else {
        echo "error";
    }
}
