<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/Drug.php'; 
use classes\Drug; 

$data = Drug::displayDrug(); 

if ($data !== false) {
    echo json_encode($data);
} else {
    http_response_code(500);
    echo "Error retrieving drug data.";
}
