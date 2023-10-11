<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../classes/DBconnector.php';

use classes\DBconnector;

$con = new DBconnector();
$conn = $con->getConnection();

$message = $error = '';

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        throw new Exception("Invalid request method. Only POST requests are allowed");
    }

    if (!isset($_POST['Patient_ID'])) {
        throw new Exception('User_ID is not provided in the request');
    }

    //check if user exists
    $stmt = $conn->prepare("SELECT * FROM patient WHERE Patient_ID = ?");
    $stmt->execute([$_POST['Patient_ID']]);

    if ($stmt->rowCount() == 0) {
        throw new Exception('Patient details not found');
    }

    if (isset($_POST['Address']) && isset($_POST['PhoneNo'])) {
        $stmt = $conn->prepare("UPDATE patient SET Address = ?, PhoneNo = ? WHERE Patient_ID = ?");
        $stmt->execute([$_POST['Address'], $_POST['PhoneNo'], $_POST['Patient_ID']]);

        $message = 'Profile updated successfully.';

        //handle profile picture update
        if (isset($_FILES["Profile"])) {
            $target_dir = "profilePics/";
            if ($_FILES["file-input"]["size"] > 1000000) {

                $message = $message . 'size too large';


            } else {

                //create directory if not exists
                if (!file_exists($target_dir)) {
                    mkdir($target_dir, 0777, true);
                }

                //save with patient id as file name
                $file_type = strtolower(pathinfo(basename($_FILES["Profile"]["name"]), PATHINFO_EXTENSION));
                $target_file = $target_dir . $_POST['Patient_ID'] . "." . $file_type;

                // Check file size
                if ($_FILES["Profile"]["size"] > 500000) {
                    throw new Exception("Sorry, your photo is too large");
                }

                // Allow certain file formats
                if ($file_type != "jpg" && $file_type != "png" && $file_type != "jpeg" && $file_type != "gif") {
                    throw new Exception("Sorry, only JPG, JPEG, PNG & GIF files are allowed");
                }

                //remove if file already exists
                if (file_exists($target_file)) {
                    unlink($target_file);
                }

                //save file
                if (move_uploaded_file($_FILES["Profile"]["tmp_name"], $target_file)) {

                    //update profile pic path in db
                    $stmt = $conn->prepare("UPDATE patient SET Profile = ? WHERE Patient_ID = ?");
                    $stmt->execute([$target_file, $_POST['Patient_ID']]);

                    $message = $message . 'Profile picture updated successfully';
                } else {
                    throw new Exception("Sorry, there was an error uploading your photo");
                }
            }
        }
    } elseif (isset($_POST['SpecialDisease'])) {
        $stmt = $conn->prepare("UPDATE patient SET SpecialDisease = ? WHERE Patient_ID = ?");
        $stmt->execute([$_POST['SpecialDisease'], $_POST['Patient_ID']]);

        $message = 'Allergy details updated successfully.';
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
