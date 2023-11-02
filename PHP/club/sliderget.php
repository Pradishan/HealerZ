<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once '../classes/DBconnector.php';

try {
    $dbConnector = new classes\DBconnector();
    $conn = $dbConnector->getConnection();
   
    $sql = "SELECT Image FROM slider";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $images = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $images[] = base64_encode($row["Image"]);
    }
   
    $conn = null;

    echo json_encode($images);
} catch (PDOException $ex) {
    die("Database error: " . $ex->getMessage());
}
?>
