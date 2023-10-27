<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once "../classes/Employee.php";
use classes\Employee;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $employee_ID = $_POST["employee_ID"];
        $employee_Name = $_POST["employee_name"];
        $role = $_POST["userType"];
        $Email = $_POST["email"];
        $PhoneNo = $_POST["phoneNo"];
        $Address = $_POST["address"];
        $SLMC = $_POST["password"];
        $Password = $_POST["regNo"];

     
        $employee = new Employee($employee_ID,$employee_Name,$role,$Email,$PhoneNo,$Address,$SLMC,$Password);
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
