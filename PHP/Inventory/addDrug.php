<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Healerz";

$conn=new mysqli($servername, $username, $password, $dbname);

if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
}
else{
    $drug_id = $_POST["Drug_ID"];
    $drug_name = $_POST["Drug_Name"];
    $category = $_POST["Category"];
    $dosage = $_POST["Drug_dosage"];
    $description = $_POST["Descriptions"];

    $sql="INSERT INTO drug(Drug_ID, Drug_Name, Category, Drug_dosage,Descriptions) VALUES ('$drug_id', '$drug_name','$category ', '$dosage', '$description');";
    $res=mysqli_query($conn,$sql);

    if ($res) {
        echo json_encode(array("message" => "Drug Added Successfully"));
    } else {
        // Check if the error is due to a duplicate primary key
        if (mysqli_errno($conn) == 1062) {
            echo json_encode(array("message" => "Drug with the same Drug_ID already exists. Please use a different Drug_ID."));
        } else {
            echo json_encode(array("message" => "Error: " . mysqli_error($conn)));
        }
    }
}