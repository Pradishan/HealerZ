<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Healerz";

$conn=new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['Drug_ID'])) {
    $drugID = $_GET['Drug_ID'];
    $query = "SELECT * FROM drug WHERE Drug_ID = '$drugID'";
    $result = $conn->query($query);
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}

$conn->close();
?>
