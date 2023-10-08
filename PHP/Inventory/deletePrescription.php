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
     
        $stmt = $conn->prepare("DELETE FROM prescription_record WHERE Prescription_ID = :PresId");
        $stmt->bindParam(':PresId', $PresId);
        $stmt->execute();
        $rowCount = $stmt->rowCount();
 
        if ($rowCount > 0) {
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

?>
