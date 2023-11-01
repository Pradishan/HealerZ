<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../classes/Event.php";
require_once "../classes/DBconnector.php";
use classes\DBconnector;
use classes\Event;

try {
    $db = new DBconnector();
    $conn = $db->getConnection();

    if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
        throw new Exception("Invalid request method. Only PUT requests are allowed.");
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['Event_ID'])) {
        throw new Exception('Event_ID is not provided in the request.');
    }
    
    $event = new Event(
        $data['Event_ID'],
        $data['Patient_ID'],
        $data['email'],
        $data['name'],
        $data['nic'],
        $data['phone_no'],
        $data['address'],
        $data['event'],
        $data['Date'],
    );
   
    $result = $event->updateEvent();
    
    if ($result) {
        echo json_encode(array('message' => 'Event updated successfully'));
    } else {
        echo json_encode(array('error' => 'Event not found or update failed'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

