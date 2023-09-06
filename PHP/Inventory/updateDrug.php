<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../classes/Drug.php";

use classes\Drug;


if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    parse_str(file_get_contents("php://input"), $_PUT);
   
    if (
        isset($_PUT['Drug_ID']) &&
        isset($_PUT['Drug_Name']) &&
        isset($_PUT['Category']) &&
        isset($_PUT['Drug_dosage']) &&
        isset($_PUT['Descriptions'])
    ) {
        $Drug_ID = $_PUT['Drug_ID'];
        $Drug_Name = $_PUT['Drug_Name'];
        $Category = $_PUT['Category'];
        $Drug_dosage =$_PUT['Drug_dosage'];
        $Descriptions = $_PUT['Descriptions'];
     
        $drug = new Drug($Drug_ID, $Drug_Name, $Category, $Drug_dosage, $Descriptions);
        
        $result = $drug->updateDrug();

        if ($result) {
            http_response_code(200);
            echo json_encode(array("message" => "Drug updated successfully."));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to update drug."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Incomplete data. Please provide all required fields."));
    }
} else {
    $response = array("message" => "Invalid request method.");
    echo json_encode($response);
}