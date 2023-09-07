
<?php

header("Access-Control-Allow-Origin: http://localhost:3000");


require_once "../classes/Patient.php";

use classes\Patient;



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $patient_id = $_POST["Patient_ID"];
        $patient_name = $_POST["Patient_Name"];
        $dob = $_POST["DateOfBirth"];
        $gender = $_POST["Gender"];
        $phoneNo = $_POST["PhoneNo"];
        $email = $_POST["Email"];
        $address = $_POST["Address"];
        $bg = $_POST["BloodGroup"];
        $pass = $_POST["Password"];

        $patient = new Patient($patient_id,$patient_name,$dob,$gender,$phoneNo,$email,$address,$bg,$pass);
        $res = $patient->addPatient();
        if ($res) {
            $response = array("message" => "Patient Added Successfully");
        } else {
            $response = array("message" => "Failed to add Patient");
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
