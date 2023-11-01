<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/Event.php'; 
use classes\Event; 

$data = Event::displayEvent(); 

if ($data !== false) {
    echo json_encode($data);
} else {
    http_response_code(500);
    echo "Error retrieving drug data.";
}
