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

        // Handle different employee types based on designation
        switch ($userType) {
            case 'doctor':
                
                $employee_id = $_POST["employee_ID"];
                $employee_name = $_POST["employee_name"];
                $userType = $_POST["userType"];
                $email = $_POST["email"];
                $phoneNo = $_POST["phoneNo"];
                $address = $_POST["address"];
                $pass = $_POST["password"];
                $regNo = $_POST["regNo"];

                $employee->setEmployee_ID($employee_id);
                $employee->setEmployee_name($employee_name);
                $employee->setUserType($userType);
                $employee->setEmail($email);
                $employee->setPhoneNo($phoneNo);
                $employee->setAddress($address);
                $employee->setPassword($pass);
                $employee->setRegNo($regNo);
                break;

            case 'pharmacist':
                
                $employee_id = $_POST["employee_ID"];
                $employee_name = $_POST["employee_name"];
                $userType = $_POST["userType"];
                $email = $_POST["email"];
                $phoneNo = $_POST["phoneNo"];
                $address = $_POST["address"];
                $pass = $_POST["password"];
                $regNo = $_POST["regNo"];

                $employee->setEmployee_ID($employee_id);
                $employee->setEmployee_name($employee_name);
                $employee->setUserType($userType);
                $employee->setEmail($email);
                $employee->setPhoneNo($phoneNo);
                $employee->setAddress($address);
                $employee->setPassword($pass);
                $employee->setRegNo($regNo);
                break;

            case 'admin':
                
                $employee_id = $_POST["employee_ID"];
                $employee_name = $_POST["employee_name"];
                $userType = $_POST["userType"];
                $pass = $_POST["password"];

                $employee->setEmployee_ID($employee_id);
                $employee->setEmployee_name($employee_name);
                $employee->setUserType($userType);
                $employee->setPassword($pass);
                break;
                
            case 'clubadmin':
                
                $employee_id = $_POST["employee_ID"];
                $employee_name = $_POST["employee_name"];
                $userType = $_POST["userType"];
                $pass = $_POST["password"];

                $employee->setEmployee_ID($employee_id);
                $employee->setEmployee_name($employee_name);
                $employee->setUserType($userType);
                $employee->setPassword($pass);
                
                break;
            
        
            default:
                // Default case if user type doesn't match any specific type
                break;
        }

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
