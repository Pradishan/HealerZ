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

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        // Get the updated drug information from the FormData
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
