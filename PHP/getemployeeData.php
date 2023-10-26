<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require './classes/DBconnector.php';
use classes\DBconnector;

try {
    $dbcon = new DBconnector();
    $conn = $dbcon->getConnection();
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['employeeID']) && !empty($_GET['employeeID'])) {
            $patientID = $_GET['employeeID'];
            $stmt = $conn->prepare("SELECT * FROM employee WHERE employee_ID  = '$patientID'");
            $stmt->execute();
       
            $filteredData = $stmt->fetchAll(PDO::FETCH_ASSOC);
          
            if ($filteredData) {
                $stmt = $conn->prepare("SELECT Profile FROM employee WHERE employee_ID  = '$patientID'");
                $stmt->execute();
                $imagePath = $stmt->fetch(PDO::FETCH_ASSOC)['Profile'];
         
                if (file_exists($imagePath)) {
                    $imageData = file_get_contents($imagePath);
                    $imageType = mime_content_type($imagePath);
                    $base64 = base64_encode($imageData);
                 
                    $filteredData[0]['Profile'] = $base64;
                    $filteredData[0]['ProfileType'] = $imageType;
                }
            
                echo json_encode($filteredData);
            } else {
                echo json_encode(['message' => 'Admin not found']);
            }
        } else {
            echo json_encode(['message' => 'Missing Pharmacist_ID parameter in the request']);
        }
    }
} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['success' => false, 'message' => 'Error fetching data: ' . $e->getMessage()]);
}
?>
