<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "neww";

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

    $sql="UPDATE drugs SET Drug_Name=?, Category=?, Dosage=?, Descriptions=? WHERE Drug_ID=?;";
    $res=mysqli_query($conn,$sql);

    if($res){
        echo "Update successfully";
    }else{
        echo "error";
    }
}