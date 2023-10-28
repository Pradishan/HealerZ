<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once '../classes/DBconnector.php';
use classes\DBconnector;

$database = new DBconnector();
$conn = $database->getConnection();

if (!$conn) {
    die("Connection failed");
}

$sql = "SELECT role, COUNT(*) as count FROM employee 
        WHERE role IN ('Doctor', 'Pharmacist', 'Admin', 'Clubadmin') 
        GROUP BY role";

$stmt = $conn->query($sql);

if ($stmt !== false) {
    $roleCounts = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $roleCounts[$row['role']] = $row['count'];
    }
} else {
    $roleCounts = [
        'Doctor' => 0,
        'Pharmacist' => 0,
        'Admin' => 0,
        'Clubadmin' => 0,
    ];
}

$conn = null;

echo json_encode($roleCounts);
?>
