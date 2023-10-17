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

$sql = "SELECT Category, COUNT(*) as count FROM drug GROUP BY Category";

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($results) {
        $totalCount = 0;

        foreach ($results as &$row) {
            $totalCount += $row['count'];
        }

        foreach ($results as &$row) {
            $percentage = ($row['count'] / $totalCount) * 100;
            $row['percentage'] = $percentage;
        }

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