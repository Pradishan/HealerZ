
<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once "../classes/Patient.php";

use classes\Patient;

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
try {
    if (!isset($_GET['Patient_ID'])) {
        throw new Exception('Patient_ID is not provided in the request.');
    }
    $patientid = $_GET['Patient_ID']; 
    $patient=new Patient($patientid, null, null, null, null,null,null,null,null);
    $res = $patient->deletePatient();
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        echo json_encode(array('message' => 'Patient deleted successfully'));
    } else {
        echo json_encode(array('error' => 'Patient not found'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
} else {
    $response = array("message" => "Invalid request method.");
    echo json_encode($response);
  
}
