<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
// Assuming you have a database connection already established
// Replace "your_db_host", "your_db_name", "your_db_username", and "your_db_password" with your actual database credentials
$host = "localhost";
$dbname = "Healerz";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Assuming you have a table called "drugs" in your database with columns "Drug_ID", "Drug_Name", "Category", "Drug_dosage", and "Descriptions"

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        // Get the updated drug information from the POST data
        $updatedDrugID = $_POST["Drug_ID"];
        $updatedDrugName = $_POST["Drug_Name"];
        $updatedCategory = $_POST["Category"];
        $updatedDosage = $_POST["Drug_dosage"];
        $updatedDescription = $_POST["Descriptions"];

        // Prepare the SQL statement for updating the drug information
        $sql = "UPDATE drug SET Drug_Name = :Drug_Name, Category = :Category, Drug_dosage = :Drug_dosage, Descriptions = :Descriptions WHERE Drug_ID = :Drug_ID";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":Drug_Name", $updatedDrugName);
        $stmt->bindParam(":Category", $updatedCategory);
        $stmt->bindParam(":Drug_dosage", $updatedDosage);
        $stmt->bindParam(":Descriptions", $updatedDescription);
        $stmt->bindParam(":Drug_ID", $updatedDrugID);

        // Execute the update query
        if ($stmt->execute()) {
            // Return a success response
            echo json_encode(array("status" => "success", "message" => "Drug information updated successfully!"));
        } else {
            // Return an error response
            echo json_encode(array("status" => "error", "message" => "Failed to update drug information."));
        }
    } catch (PDOException $e) {
        // Return an error response if any exception occurs
        echo json_encode(array("status" => "error", "message" => $e->getMessage()));
    }
} else {
    // Return an error response for invalid request method
    echo json_encode(array("status" => "error", "message" => "Invalid request method."));
}
