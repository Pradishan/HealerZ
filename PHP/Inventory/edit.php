<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include './classes/DBconnector.php';
use classes\DBconnector;
$objDb = new DBConnector;
$conn = $objDb->getConnection();


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM drug";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE Drug_ID = :Drug_ID";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Drug_ID', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;

    case "PUT":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE drug SET Drug_Name= :Drug_Name, Category =:Category, Drug_dosage =:Drug_dosage, Descriptions =:Descriptions WHERE Drug_ID = :Drug_ID";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':Drug_ID', $user->Drug_ID);
        $stmt->bindParam(':Drug_Name', $user->Drug_Name);
        $stmt->bindParam(':Category', $user->Category);
        $stmt->bindParam(':Drug_dosage', $user->Drug_dosage);
        $stmt->bindParam(':Descriptions', $user->Descriptions);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
        
    default:
        header("HTTP/1.1 405 Method Not Allowed");
        echo json_encode(['message' => 'Method Not Allowed']);
}
