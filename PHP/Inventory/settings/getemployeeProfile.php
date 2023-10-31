<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require '../../classes/DBconnector.php';
use classes\DBconnector;

try {
    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['employeeID']) && !empty($_GET['employeeID'])) {
            $employeeID = $_GET['employeeID'];

            $stmt = $conn->prepare("SELECT * FROM employee WHERE employee_ID = :employeeID");
            $stmt->bindParam(':employeeID', $employeeID);
            $stmt->execute();

            $employeeData = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($employeeData) {
                $imagePath = $employeeData['Profile'];
                if (is_null($imagePath) || !file_exists($imagePath)) {
                    $imagePath = './profilePics/default_dp.png'; 
                }
                $imageData = file_get_contents($imagePath);
                $imageType = mime_content_type($imagePath);
                $base64 = base64_encode($imageData);

                $employeeData['Profile'] = $base64;
                $employeeData['ProfileType'] = $imageType;
                echo json_encode($employeeData);
            } else {
                echo json_encode(['message' => 'Employee not found']);
            }
        } else {
            echo json_encode(['message' => 'Missing employeeID parameter in the request']);
        }
    }
} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['success' => false, 'message' => 'Error fetching data: ' . $e->getMessage()]);
}
?>
