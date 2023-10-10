<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once '../../classes/DBconnector.php';
use classes\DBconnector;

$dbConnector = new DBconnector();

try {
    $conn = $dbConnector->getConnection();
} catch (PDOException $ex) {
    die("ERROR: " . $ex->getMessage());
}

$sql = "SELECT MONTH(TimeP) AS Month, COUNT(*) AS RecordCount FROM prescription_record GROUP BY Month";

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($results) {
        header('Content-Type: application/json');
        echo json_encode($results);
    } else {
        echo "No data found";
    }
} catch (PDOException $ex) {
    http_response_code(500);
    echo json_encode(array("message" => "Error: " . $ex->getMessage()));
}

$conn = null;
