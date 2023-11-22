<?php
require '../classes/DBconnector.php';
use \classes\DBconnector;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

try {
    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $stmt = $conn->prepare("SELECT medicalrequest.*, patient.Patient_ID, patient.PatientName, patient.Profile 
                        FROM medicalrequest 
                        INNER JOIN patient ON medicalrequest.Patient_ID = patient.Patient_ID 
                        ORDER BY medicalrequest.MedicalRequest_ID DESC");

        $stmt->execute();

        $filteredData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($filteredData) {
            header('Content-Type: application/json');

            foreach ($filteredData as &$row) {
                $imagePath = $row['Profile'];

                if (file_exists($imagePath)) {
                    $imageData = file_get_contents($imagePath);
                    $imageType = mime_content_type($imagePath);

                    $base64 = base64_encode($imageData);

                    $row['Profile'] = $base64;
                    $row['ProfileType'] = $imageType;
                }
            }
            unset($row); // Unset the reference to the last element to avoid conflicts

            echo json_encode($filteredData);
        } else {
            echo json_encode(['message' => 'Patient not found']);
        }
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching data: ' . $e->getMessage()]);
}
?>