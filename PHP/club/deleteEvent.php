
<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once "../classes/Event.php";
use classes\Event;

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
try {
    if (!isset($_GET['evtreg_id'])) {
        throw new Exception('event_ID is not provided in the request.');
    }
    $eventid = $_GET['evtreg_id']; 
    $event=new Event($eventid, null, null, null, null,null,null,null,null);
    $res = $event->deleteEvent();
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        echo json_encode(array('message' => 'Event deleted successfully'));
    } else {
        echo json_encode(array('error' => 'Event not found'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
} else {
    $response = array("message" => "Invalid request method.");
    echo json_encode($response);
  
}
