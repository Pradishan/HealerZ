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

// Assuming you receive the updated data from the front-end as JSON.
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data)) {
    // Replace 'your_table_name' with the actual table name in your database.
    $drugID = $data['Drug_ID'];
    $drugName = $data['Drug_Name'];
    $category = $data['Category'];
    $dosage = $data['Drug_dosage'];
    $description = $data['Descriptions'];

    // Update the record in the database based on the Drug_ID.
    $query = "UPDATE drug SET Drug_Name = '$drugName', Category = '$category', Drug_dosage = '$dosage', Descriptions = '$description' WHERE Drug_ID = '$drugID'";

    if ($conn->query($query) === TRUE) {
        // The update was successful. You can send a response or handle it as needed.
        echo json_encode(array('message' => 'Update successful'));
    } else {
        // If there was an error with the update query.
        echo json_encode(array('message' => 'Update failed'));
    }
} else {
    // If the data is empty or not received properly from the front-end.
    echo json_encode(array('message' => 'Invalid data'));
}

$conn->close();
?>
