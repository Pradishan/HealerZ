<?php
// Assuming you have a database connection already established
header("Access-Control-Allow-Origin: http://localhost:3000");
$host = "localhost"; // Replace with your database host
$dbname = "Healerz"; // Replace with your database name
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password (if any)

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Check if the request is a DELETE request
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    try {
        // Get the Drug_ID from the URL parameters
        $drugID = $_GET["Drug_ID"];

        // Prepare the SQL statement for deleting the drug information
        $sql = "DELETE FROM drug WHERE Drug_ID = :Drug_ID";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":Drug_ID", $drugID);

        // Execute the delete query
        if ($stmt->execute()) {
            // Return a success response
            echo json_encode(array("status" => "success", "message" => "Drug information deleted successfully!"));
        } else {
            // Return an error response
            echo json_encode(array("status" => "error", "message" => "Failed to delete drug information."));
        }
    } catch (PDOException $e) {
        // Return an error response if any exception occurs
        echo json_encode(array("status" => "error", "message" => $e->getMessage()));
    }
} else {
    // Return an error response for invalid request method
    echo json_encode(array("status" => "error", "message" => "Invalid request method."));
}
