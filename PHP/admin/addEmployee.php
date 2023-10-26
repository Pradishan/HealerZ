<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once "../classes/Employee.php";
use classes\Employee;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $employee_id = $_POST["employee_ID"];
        $employee_name = $_POST["employee_name"];
        $userType = $_POST["userType"];
        $email = $_POST["email"];
        $phoneNo = $_POST["phoneNo"];
        $address = $_POST["address"];
        $pass = $_POST["password"];
        $regNo = $_POST["regNo"];

     
        $employee = new Employee($employee_id, $employee_name, $phoneNo, $email, $address, $pass, $regNo, $userType);


        // Add the employee to the database
        $res = $employee->addEmployee();

        if ($res) {
            $response = array("message" => "Employee Added Successfully");
        } else {
            $response = array("message" => "Failed to add Employee");
        }

        echo json_encode($response);
    } catch (Exception $e) {
        $response = array("message" => "Error: " . $e->getMessage());
        echo json_encode($response);
    }
} else {
    $response = array("message" => "Invalid request method.");
    echo json_encode($response);
}
?>
