<?php

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
    $doctor_ID = $_POST["doctor_ID"];
    $doctor_Name = $_POST["doctor_name"];
    $designation = $_POST["designation"];
    $email = $_POST["email"];
    $phoneNo = $_POST["phoneNo"];
    $address = $_POST["address"];
    $password = $_POST["password"];
    $regNo = $_POST["regNo"];
    $imageUpload = $_POST["imageUpload"];
    
    $sql = "INSERT INTO doctor(Doctor_ID,Doctor_Name,Designation,Email,PhoneNo,Address,Password,SLMC,Image) VALUES ('$doctor_ID', '$doctor_Name','$designation','$email','$phoneNo', '$address', '$password', '$regNo', '$imageUpload');";
    $res = mysqli_query($conn, $sql);

    if ($res) {
        echo json_encode(array("message" => "Doctor Added Successfully"));
    } else {
        // Check if the error is due to a duplicate primary key
        if (mysqli_errno($conn) == 1062) {
            echo json_encode(array("message" => "Doctor with the same Doctor_ID already exists. Please use a different Doctor_ID."));
        } else {
            echo json_encode(array("message" => "Error: " . mysqli_error($conn)));
        }
    }
}
