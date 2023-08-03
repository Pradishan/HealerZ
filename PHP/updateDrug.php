<?php
// Assuming you have already established a connection to the database using PDO
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 3600");

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

// Handle preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(); // Return empty response for preflight request
}

// Check if the request method is PUT
if ($_SERVER['REQUEST_METHOD'] === "PUT") {
    // Get the PUT data from the request body
    $putData = json_decode(file_get_contents('php://input'), true);

    // Validate the received data (ensure that required fields are present and have valid values)

    // Assuming the primary key for the 'drug' table is 'Drug_ID'
    if (!isset($putData['Drug_ID']) || empty($putData['Drug_ID'])) {
        http_response_code(400); // Bad Request
        exit("Drug_ID is missing or empty.");
    }

    // Perform the update operation
    // Assuming you have a valid database connection stored in $conn

    $drugID = $putData['Drug_ID'];

    // Prepare the update query
    $query = "UPDATE drug SET Drug_Name = :drugName, Category = :category, Drug_dosage = :dosage, Descriptions = :description WHERE Drug_ID = :drugID";
    $stmt = $conn->prepare($query);

    $drugName = isset($putData['Drug_Name']) ? $putData['Drug_Name'] : null;
    $category = isset($putData['Category']) ? $putData['Category'] : null;
    $dosage = isset($putData['Drug_dosage']) ? $putData['Drug_dosage'] : null;
    $description = isset($putData['Descriptions']) ? $putData['Descriptions'] : null;

    // Bind the parameters
    $stmt->bindParam(':drugName', $drugName);
    $stmt->bindParam(':category', $category);
    $stmt->bindParam(':dosage', $dosage);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':drugID', $drugID);

    // Execute the query
    $stmt->execute();

    // Check if the update was successful
    if ($stmt->rowCount() > 0) {
        http_response_code(200); // OK
        echo "Drug updated successfully!";
    } else {
        http_response_code(500); // Internal Server Error
        echo "Failed to update drug!";
    }

    // Close the statement and database connection
    $stmt = null;
    $conn = null;
} else {
    http_response_code(405); // Method Not Allowed
    echo "Invalid request method. Only PUT method is allowed.";
}
