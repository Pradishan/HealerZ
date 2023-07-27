<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "Healerz";

// $conn=new mysqli($servername, $username, $password, $dbname);

// if(mysqli_connect_error()){
//     echo mysqli_connect_error();
//     exit();
// }
// else{
//     $drug_id = $_POST["Drug_ID"];
//     $drug_name = $_POST["Drug_Name"];
//     $category = $_POST["Category"];
//     $dosage = $_POST["Drug_dosage"];
//     $description = $_POST["Descriptions"];

//     $sql = "UPDATE drug SET Drug_Name=?, Category=?, Drug_dosage=?, Descriptions=? WHERE Drug_ID=?";
//     $res=mysqli_query($conn,$sql);

//     if($res){
//         echo "Update successfully";
//     }else{
//         echo "error";
//     }
// }


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
    $drug_name = $_POST["Drug_Name"];
    $category = $_POST["Category"];
    $dosage = $_POST["Drug_dosage"];
    $description = $_POST["Descriptions"];

    // Prepare the update query
    $sql = "UPDATE drug SET Drug_Name=?, Category=?, Drug_dosage=?, Descriptions=? WHERE Drug_ID=?";

    // Prepare the statement
    $stmt = $conn->prepare($sql);

    // Bind the parameters
    $stmt->bind_param("sssss", $drug_name, $category, $dosage, $description, $drug_id);

    // Execute the update query
    if ($stmt->execute()) {
        echo "Update successfully";
    } else {
        echo "error";
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}

