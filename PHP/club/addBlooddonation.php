
<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once "../classes/BloodDonation.php";

use classes\BloodDonation;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $Patient_ID = $_POST["Patient_ID"];
        $bloodgroup = $_POST["BloodGroup"];
        $name = $_POST["name"];
        $Bloodreg = new BloodDonation(null,$bloodgroup,null,$Patient_ID,$name);
        $res = $Bloodreg->addBlood();
        if ($res) {
            $response = array("message" => "Successfully Donated");
        } else {
            $response = array("message" => "Failed to add BloodDonar");
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