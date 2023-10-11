<?php
// Enable CORS for all requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add 'Authorization' if you are using it in your requests

require '../classes/DBconnector.php';
use \classes\DBconnector;

try {
    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the request method is GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Check if 'patient_ID' is provided as a query parameter
        if (isset($_GET['patientID']) && !empty($_GET['patientID'])) {
            // Get the patient ID from the query parameter
            $patientID = $_GET['patientID'];

            // Prepare and execute the SQL query using the patientID as a parameter
            $stmt = $conn->prepare("SELECT * FROM patient WHERE Patient_ID = '$patientID'");
            $stmt->execute();

            // Fetch the filtered data as an associative array
            $filteredData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Check if any data was found for the given Patient_ID
            if ($filteredData) {
                //get image path from db
                $stmt = $conn->prepare("SELECT Profile FROM patient WHERE Patient_ID = '$patientID'");
                $stmt->execute();
                $imagePath = $stmt->fetch(PDO::FETCH_ASSOC)['Profile'];

                //check if image exists
                if (file_exists($imagePath)) {
                    //get image data
                    $imageData = file_get_contents($imagePath);
                    $imageType = mime_content_type($imagePath);

                    //encode image data as base64
                    $base64 = base64_encode($imageData);

                    //add base64 encoded image data to the filtered data array
                    $filteredData[0]['Profile'] = $base64;
                    $filteredData[0]['ProfileType'] = $imageType;
                }

                // Return the filtered data as JSON
                echo json_encode($filteredData);
            } else {
                // If no data found for the given Patient_ID, return an error message or appropriate response
                echo json_encode(['message' => 'Patient not found']);
            }
        } else {
            // If 'patientID' is not provided as a query parameter, return an error message or appropriate response
            echo json_encode(['message' => 'Missing patientID parameter in the request']);
        }
    }
} catch (Exception $e) {
    // Return an error response with the specific error message to the front-end
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['success' => false, 'message' => 'Error fetching data: ' . $e->getMessage()]);
}
?>
