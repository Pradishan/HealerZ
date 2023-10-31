<?php 

header("Access-Control-Allow-Origin: http://localhost:3000");

require_once "../classes/Eventreg.php";

use classes\Eventreg;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $email = $_POST["email"];
        $name = $_POST["name"];
        $nic  = $_POST["nic"];
        $phone_no = $_POST["phone_no"];
        $address = $_POST["address"];
        $event  = $_POST["event"];

        $Eventreg = new Eventreg($email, $name, $nic, $phone_no, $address, $event);
        $res = $Eventreg->register();

        if ($res) {
            $response = array("message" => true);
            echo json_encode($response);
        } else {
            $response = array("message" => "Failed, Try Again");
            echo json_encode($response);
        }

       

    } catch (Exception $e) {
        $response = array("message" => "Error: " . $e->getMessage());
        echo json_encode($response);
    }
} else {
    $response = array("message" => "Invalid request method.");
    echo json_encode($response);
}
