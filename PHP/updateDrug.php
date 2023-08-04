<?php
// Replace these credentials with your actual database connection details
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with the URL of your React application

// Allow specific HTTP methods (in this case, only DELETE)
header("Access-Control-Allow-Methods: PUT");

// Allow the following headers to be sent with the request
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Healerz";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the request method is PUT
    if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
        throw new Exception("Invalid request method. Only PUT requests are allowed.");
    }

    // Get the request payload data
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if Drug_ID is provided in the request payload
    if (!isset($data['Drug_ID'])) {
        throw new Exception('Drug_ID is not provided in the request.');
    }

    // Prepare the SQL statement to update the drug record
    $stmt = $conn->prepare("UPDATE drug SET Drug_Name = :Drug_Name, Category = :Category, Drug_dosage = :Drug_dosage, Descriptions = :Descriptions WHERE Drug_ID = :Drug_ID");
    $stmt->bindParam(':Drug_Name', $data['Drug_Name']);
    $stmt->bindParam(':Category', $data['Category']);
    $stmt->bindParam(':Drug_dosage', $data['Drug_dosage']);
    $stmt->bindParam(':Descriptions', $data['Descriptions']);
    $stmt->bindParam(':Drug_ID', $data['Drug_ID']);

    // Execute the SQL statement
    $stmt->execute();

    // Check if any rows were affected (i.e., if the drug was updated successfully)
    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        // Drug updated successfully
        echo json_encode(array('message' => 'Drug updated successfully'));
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
