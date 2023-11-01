<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../classes/Vaccination.php';

if (isset($_POST['id']) && isset($_POST['vaccinationType'])) {
    $id = $_POST['id'];
    $type = $_POST['vaccinationType'];
    $vaccination = new \classes\Vaccination(null, $type, null, $id); 
    $isVaccinated = $vaccination->checkVaccinationStatus($id, $type);
    if ($isVaccinated) {
        echo json_encode(["message" => "Already Vaccinated"]);
    } else {
        echo json_encode(["message" => "Not vaccinated"]);
    }
} else {
    echo json_encode(["message" => "Invalid data provided."]);
}

?>
