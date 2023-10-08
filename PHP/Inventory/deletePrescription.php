<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if (isset($_GET['id'])) {
    $PresId = filter_var($_GET['id']);
    try {
        $dbHost = "localhost"; 
        $dbName = "Healerz";
        $dbUser = "root"; 
        $dbPass = ""; 

        $conn = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt1 = $conn->prepare("DELETE FROM prescription_list WHERE Prescription_ID = :PresId");
        $stmt1->bindParam(':PresId', $PresId);
        $stmt1->execute();
        $rowCount1 = $stmt1->rowCount();


        $stmt2 = $conn->prepare("DELETE FROM prescription_record WHERE Prescription_ID = :PresId");
        $stmt2->bindParam(':PresId', $PresId);
        $stmt2->execute();
        $rowCount2 = $stmt2->rowCount();

        // Then, delete from prescription_list
       

        if ($rowCount1 > 0 || $rowCount2 > 0) {
            echo json_encode(array('message' => 'Prescription deleted successfully'));
        } else {
            echo json_encode(array('error' => 'Prescription not found'));
        }
    } catch (PDOException $e) {
        echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
    }
} else {
    echo json_encode(array('message' => 'Missing Prescription_ID'));
}
?>
