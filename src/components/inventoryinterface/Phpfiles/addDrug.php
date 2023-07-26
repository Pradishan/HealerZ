<?php
header('Access-Control-Allow-Orgin: *');
// Replace these credentials with your MySQL database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "healerz";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form data has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $drug_id = $_POST["Drug_ID"];
    $drug_name = $_POST["Drug_Name"];
    $category = $_POST["Category"];
    $dosage = $_POST["Drug_dosage"];
    $description = $_POST["Descriptions"];

    // Prepare and execute the SQL statement to insert data into the table
    $stmt = $conn->prepare("INSERT INTO drug(Drug_ID, Drug_Name, Category, Drug_dosage,Descriptions) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $drug_id, $drug_name, $category, $dosage, $description);

    if ($stmt->execute()) {
        echo "Item added successfully!";
    } else {
        echo "Error: " . $conn->error;
    }

    $stmt->close();
}

// Close the database connection
$conn->close();
?>
