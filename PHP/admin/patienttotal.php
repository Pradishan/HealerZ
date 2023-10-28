<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once('../classes/DBconnector.php');

$dbConnector = new classes\DBconnector(); 

$pdo = $dbConnector->getConnection(); 

if (!$pdo) {
    die("Connection failed.");
}
$query = "SELECT COUNT(*) as count FROM patient";

$result = $pdo->query($query);

if ($result) {
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $patientCount = $row['count'];
    echo $patientCount;
} else {
    echo "Error fetching patient count";
}

$pdo = null;
?>
