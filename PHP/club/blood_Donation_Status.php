<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../classes/BloodDonation.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    $bloodDonation = new \classes\BloodDonation(null,null,null,$id,null);
    $result = $bloodDonation->getDonationRecordsByPatientId($id);

    echo json_encode($result);
} else {
    echo json_encode(["message" => "Invalid data provided."]);
}
?>
