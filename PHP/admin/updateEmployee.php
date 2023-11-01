<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../classes/Employee.php";
require_once "../classes/DBconnector.php";
use classes\DBconnector;
use classes\Employee;

try {
    $db = new DBconnector();
    $conn = $db->getConnection();

    if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
        throw new Exception("Invalid request method. Only PUT requests are allowed.");
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['employee_ID'])) {
        throw new Exception('employee_ID is not provided in the request.');
    }
    
    $employee = new Employee(
        $data['employee_ID'],
        $data['employee_Name'],
        $data['role'],
        $data['Email'],
        $data['PhoneNo'],
        $data['Address'],
        $data['SLMC'],
        $data['Password'],
    );
   
    $result = $employee->updateEmployee();
    
    if ($result) {
        echo json_encode(array('message' => 'Employee updated successfully'));
    } else {
        echo json_encode(array('error' => 'Employee not found or update failed'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

