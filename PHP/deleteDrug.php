<?php
// Replace these credentials with your actual database connection details
// Allow cross-origin requests
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with the URL of your React application

// Allow specific HTTP methods (in this case, only DELETE)
header("Access-Control-Allow-Methods: DELETE");

// Allow the following headers to be sent with the request
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Set the response content type to JSON
header("Content-Type: application/json");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Healerz";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if Drug_ID is provided in the query parameters
    if (!isset($_GET['Drug_ID'])) {
        throw new Exception('Drug_ID is not provided in the request.');
    }

    // Get the Drug_ID from the query parameters
    $drugId = $_GET['Drug_ID'];

    // Prepare the SQL statement to delete the drug record
    $stmt = $conn->prepare("DELETE FROM drug WHERE Drug_ID = :drugId");
    $stmt->bindParam(':drugId', $drugId);
    
    // Execute the SQL statement
    $stmt->execute();

    // Check if any rows were affected (i.e., if the drug was deleted successfully)
    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        // Drug deleted successfully
        echo json_encode(array('message' => 'Drug deleted successfully'));
    } else {
        // Drug with the provided Drug_ID was not found
        echo json_encode(array('error' => 'Drug not found'));
    }
} catch (PDOException $e) {
    // Handle database connection and query errors
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
} catch (Exception $e) {
    // Handle other errors
    echo json_encode(array('error' => $e->getMessage()));
}
