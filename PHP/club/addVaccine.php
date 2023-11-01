
<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once "../classes/Vaccination.php";

use classes\Vaccination;



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $Patient_ID = $_POST["Patient_ID"];
        $VaccinationName = $_POST["VaccinationName"];
        $Vaccreg = new Vaccination(null,$VaccinationName,null,$Patient_ID);
        $res = $Vaccreg->addVaccine();
        if ($res) {
            $response = array("message" => "Vaccine Registration Successfully");
        } else {
            $response = array("message" => "Failed to add Vaccine");
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