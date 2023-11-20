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
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['patient_ID'])) {
            $patientID = $data['patient_ID'];

            $stmt = $conn->prepare("SELECT * FROM patient WHERE Patient_ID = ?");
            $stmt->execute([$patientID]);

            $filteredData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($filteredData) {
                header('Content-Type: application/json');

                $imagePath = $filteredData[0]['Profile']; // Assume Profile contains the relative image path

                if (file_exists($imagePath)) {
                    $imageData = file_get_contents($imagePath);
                    $imageType = mime_content_type($imagePath);

                    $base64 = base64_encode($imageData);

                    $filteredData[0]['Profile'] = $base64;
                    $filteredData[0]['ProfileType'] = $imageType;
                }

                echo json_encode($filteredData);
            } else {
                echo json_encode(['message' => 'Patient not found']);
            }
        } else {
            echo json_encode(['message' => 'Missing patient_ID in the request']);
        }
    }
} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['success' => false, 'message' => 'Error fetching data: ' . $e->getMessage()]);
}
?>
