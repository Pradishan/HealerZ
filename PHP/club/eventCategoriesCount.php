<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/DBconnector.php'; 
$dbConnector = new classes\DBconnector();

$connection = $dbConnector->getConnection();

$query = "SELECT event, COUNT(*) as count FROM event GROUP BY event";

$stmt = $connection->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
?>
