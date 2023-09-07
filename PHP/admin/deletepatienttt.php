<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
if (isset($_GET['id'])) {

    $patientID = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
    try {
      
        $dbHost = "localhost"; 
        $dbName = "Healerz";
        $dbUser = "root"; 
        $dbPass = ""; 

        $conn = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     
        $stmt = $conn->prepare("DELETE FROM patient WHERE Patient_ID = :patientId");
        $stmt->bindParam(':patientId', $patientID, PDO::PARAM_INT);
        $stmt->execute();
        $rowCount = $stmt->rowCount();
 
        if ($rowCount > 0) {
            echo json_encode(array('message' => 'Patient deleted successfully'));
        } else {
            echo json_encode(array('error' => 'Patient not found'));
        }
    } catch (PDOException $e) {
        echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
    }
} else {
    echo json_encode(array('message' => 'Missing drug ID'));
}
?>
