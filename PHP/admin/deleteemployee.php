
<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once "../classes/Employee.php";
use classes\Employee;

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
try {
    if (!isset($_GET['employee_ID'])) {
        throw new Exception('employee_ID is not provided in the request.');
    }
    $employee_ID = $_GET['employee_ID']; 
    $employee =new Employee($employee_ID, null, null, null, null, null, null, null);
    $res = $employee->deleteemployee();
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        echo json_encode(array('message' => 'Employee deleted successfully'));
    } else {
        echo json_encode(array('error' => 'Employee not found'));
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
