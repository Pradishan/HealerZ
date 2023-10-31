
<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once "../classes/Event.php";

use classes\Event;



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $Patient_ID = $_POST["Patient_ID"];
        $email = $_POST["email"];
        $name = $_POST["name"];
        $nic  = $_POST["nic"];
        $phone_no = $_POST["phone_no"];
        $address = $_POST["address"];
        $event  = $_POST["event"];
        $Eventreg = new Event(null, $Patient_ID, $email, $name, $nic, $phone_no, $address, $event, null);
        $res = $Eventreg->addevent();
        if ($res) {
            $response = array("message" => "Event Registration Successfully");
        } else {
            $response = array("message" => "Failed to add Event");
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