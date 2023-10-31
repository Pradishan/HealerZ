<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../../classes/DBconnector.php';

use classes\DBconnector;

$con = new DBconnector();
$conn = $con->getConnection();

$message = $error = '';

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        throw new Exception("Invalid request method. Only POST requests are allowed");
    }

    if (!isset($_POST['employee_ID'])) {
        throw new Exception('employee_ID is not provided in the request');
    }
  
    $stmt = $conn->prepare("SELECT * FROM employee WHERE employee_ID = ?");
    $stmt->execute([$_POST['employee_ID']]);

    if ($stmt->rowCount() == 0) {
        throw new Exception('Pharmacist details not found');
    }

    if (isset($_POST['Address']) && isset($_POST['PhoneNo'])) {
        $stmt = $conn->prepare("UPDATE employee SET Address = ?, PhoneNo = ? WHERE employee_ID = ?");
        $stmt->execute([$_POST['Address'], $_POST['PhoneNo'], $_POST['employee_ID']]);

        $message = 'Profile updated successfully.';
     
        if (isset($_FILES["Profile"])) {
            $target_dir = "profilePics/";
            if ($_FILES["file-input"]["size"] > 1000000) {

                $message = $message . 'size too large';


            } else {
                if (!file_exists($target_dir)) {
                    mkdir($target_dir, 0777, true);
                }
              
                $file_type = strtolower(pathinfo(basename($_FILES["Profile"]["name"]), PATHINFO_EXTENSION));
                $target_file = $target_dir . $_POST['employee_ID'] . "." . $file_type;
             
                if ($_FILES["Profile"]["size"] > 500000) {
                    throw new Exception("Sorry, your photo is too large");
                }
          
                if ($file_type != "jpg" && $file_type != "png" && $file_type != "jpeg" && $file_type != "gif") {
                    throw new Exception("Sorry, only JPG, JPEG, PNG & GIF files are allowed");
                }
             
                if (file_exists($target_file)) {
                    unlink($target_file);
                }
         
                if (move_uploaded_file($_FILES["Profile"]["tmp_name"], $target_file)) {
                   
                    $stmt = $conn->prepare("UPDATE employee SET Profile = ? WHERE employee_ID = ?");
                    $stmt->execute([$target_file, $_POST['employee_ID']]);

                    $message = 'Profile updated successfully.';
                } else {
                    throw new Exception("Sorry, there was an error uploading your photo");
                }
            }
        }
    }
} catch (PDOException $e) {
    $error = 'Database error: ' . $e->getMessage();
} catch (Exception $e) {
    $error = $e->getMessage();
} finally {
    $response = [];
    $message && $response['message'] = $message;
    $error && $response['error'] = $error;
    echo json_encode($response);
}
