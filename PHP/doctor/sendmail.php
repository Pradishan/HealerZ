<?php

require '../classes/Prescription.php';
require '../classes/Drug.php';
require '../mail/Exception.php';
require '../mail/PHPMailer.php';
require '../mail/SMTP.php';
use classes\Drug;
use classes\Prescription;
use PHPMailer\PHPMailer\PHPMailer;

// Enable CORS for requests from http://localhost:3000
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add 'Authorization' if you are using it in your requests

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    // Handle the preflight request and return the allowed methods
    header("HTTP/1.1 200 OK");
    exit();
}

$method = $_SERVER["REQUEST_METHOD"];

// Login API endpoint
if ($method === "POST") {
    try {
        // Front-end sends data as JSON
        $data = json_decode(file_get_contents('php://input'), true);

        $receptionists = $data['receptionists'];
        $Subject = $data['Subject'];
        $emailMessage = $data['emailMessage'];

        $mail = new PHPMailer(true);

        // Server settings
        $mail->SMTPDebug = 0; // Enable verbose debug output
        $mail->isSMTP(); // Send using SMTP
        $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'healerz763@gmail.com'; // SMTP username
        $mail->Password = 'iqgb czzi sjbp ecjg'; // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable implicit TLS encryption
        $mail->Port = 465;

        // Recipients
        $mail->setFrom('healerz763@gmail.com');
        $mail->addAddress($receptionists); // Add a recipient
        // Name is optional

        // Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = $Subject;

        // You should host the image on a public server and provide the correct image URL here
        $imageURL = 'logo.png';

        $message = $emailMessage;
        $message .= "<br>Best regards ,<br><br>";
        $message .= "HealerZ ,<br>";
        $message .= "Medical System of UWU ,<br>";
        $message .= "Uva Wellassa University of Srilanka ,<br><br>";
        $message .= "<img src='$imageURL' alt='Your Logo' height='100' width='200'><br><br>";

        $mail->Body = $message;

        if ($mail->send()) {
            // Send a success response
            http_response_code(200);
            echo json_encode(['success' => true, 'message' => 'Mail sent successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error adding data', 'error' => $e->getMessage()]);
    }
}
?>