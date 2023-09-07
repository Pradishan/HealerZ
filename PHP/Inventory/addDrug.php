<?php

header("Access-Control-Allow-Origin: http://localhost:3000");


require_once "../classes/Drug.php";

use classes\Drug;



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $drug_id = $_POST["Drug_ID"];
        $drug_name = $_POST["Drug_Name"];
        $category = $_POST["Category"];
        $dosage = $_POST["Drug_dosage"];
        $description = $_POST["Descriptions"];

        $drug = new Drug($drug_id,$drug_name,$category,$dosage,$description);
        $res = $drug->addDrug();
        if ($res) {
            $response = array("message" => "Drug Added Successfully");
        } else {
            $response = array("message" => "Failed to add Drug");
        }

        echo json_encode($response);
    } catch (Exception $e) {
        $response = array("message" => "Error: " . $e->getMessage());
        echo json_encode($response);
    }
} else {
    $response = array("message" => "Invalid request method.");
    echo json_encode($response);
  
}


?>
