<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Healerz";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   
    if (!isset($_GET['Drug_ID'])) {
        throw new Exception('Drug_ID is not provided in the request.');
    }
    $drugId = $_GET['Drug_ID'];

    $stmt = $conn->prepare("DELETE FROM druginventory WHERE Drug_ID = :drugId");
    $stmt->bindParam(':drugId', $drugId);
    $stmt->execute();

    // Then, delete the record from the drug table
    $stmt = $conn->prepare("DELETE FROM drug WHERE Drug_ID = :drugId");
    $stmt->bindParam(':drugId', $drugId);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        echo json_encode(array('message' => 'Drug deleted successfully'));
    } else {
        echo json_encode(array('error' => 'Drug not found'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
