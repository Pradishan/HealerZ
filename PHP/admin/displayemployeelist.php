<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/Employee.php'; 
use classes\Employee; 

$data = Employee::displayEmployee(); 

if ($data !== false) {
    echo json_encode($data);
} else {
    http_response_code(500);
    echo "Error retrieving drug data.";
}
