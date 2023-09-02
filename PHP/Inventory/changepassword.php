<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

// Allow credentials
header("Access-Control-Allow-Credentials: true");

// Enable CORS for specific methods (e.g., POST)
header("Access-Control-Allow-Methods: POST");

// Allow headers that may be sent with the request
header("Access-Control-Allow-Headers: Content-Type");
$pharmacistID = "new"; // Replace with the actual Pharmacist_ID

// Get the new password from your request data
//$newPassword = $_POST['newPassword']; // Assuming you send the new password from your React component
$newPassword = isset($_POST['newPassword']) ? $_POST['newPassword'] : null;
var_dump($newPassword); // Print the value to debug

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Healerz";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Hash the new password (for security) - You should use a stronger hashing method
// $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

// Prepare and execute SQL query to update the password in the database
$sql = "UPDATE pharmacist SET Password = '$newPassword' WHERE Pharmacist_ID = '$pharmacistID'";
if ($conn->query($sql) === TRUE) {
    echo "Password changed successfully.";
} else {
    echo "Error changing password: " . $conn->error;
}

// Close the database connection
$conn->close();
?>
