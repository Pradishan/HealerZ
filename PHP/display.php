<?php
// Replace 'your_database_host', 'your_database_user', 'your_database_password', and 'your_database_name' with your actual database credentials.
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
    // Replace 'your_table_name' and 'column_name' with the appropriate table and column names in your database.
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
