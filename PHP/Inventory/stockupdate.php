<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/Drug.php'; 
use classes\Drug; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST["Drug_ID"]) && isset($_POST["StockCount"])) {
        $drugID = $_POST["Drug_ID"];
        $stockCount = $_POST["StockCount"];
        $drug = new Drug($drugID, '', '', '', '');
  
        $result = $drug->updateStockCount($stockCount);

        if ($result) {
            echo "Stock Count Updated Successfully";
        } else {
            echo "Error updating stock count";
        }
    } else {
        echo "Missing required parameters";
    }
} else {
    echo "Invalid request method.";
}
?>
