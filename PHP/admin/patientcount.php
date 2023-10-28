<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once('../classes/DBconnector.php'); 

$dbConnector = new classes\DBconnector(); 

$pdo = $dbConnector->getConnection();

if (!$pdo) {
    die("Connection failed.");
}

$query = "SELECT Gender, COUNT(*) as count FROM patient GROUP BY Gender";

$result = $pdo->query($query);

$data = array();
$total = 0;

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
    $total += $row['count'];
}

foreach ($data as &$row) {
    if ($row['Gender'] == 'Male') {
        $row['Gender'] = 'Male';
    } elseif ($row['Gender'] == 'Female') {
        $row['Gender'] = 'Female';
    }
    $row['percentage'] = ($row['count'] / $total) * 100;
}

header('Content-Type: application/json');
echo json_encode($data);
$pdo = null;
?>
