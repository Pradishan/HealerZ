<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/Drug.php'; 
use classes\Drug; 

if (isset($_GET['Drug_ID'])) {
    $drugID = $_GET['Drug_ID'];
    $data = Drug::getDrugByID($drugID);

    if ($data !== false) {
        echo json_encode($data);
    } else {
        http_response_code(500);
        echo "Error retrieving drug data.";
    }
}
