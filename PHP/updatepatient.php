<?php
// Include your database connection configuration here
// Example:
$dbHost = 'localhost';
$dbUser = 'root';
$dbPassword = '';
$dbName = 'Healerz';

// Create a database connection
$mysqli = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

// Check for a successful connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Get data from the POST request
$patient_id = $_POST['Patient_ID'];
$patient_name = $_POST['PatientName'];
$date_of_birth = $_POST['DateOfBirth'];
$gender = $_POST['Gender'];
$phone_no = $_POST['PhoneNo'];
$email = $_POST['Email'];
$address = $_POST['Address'];
$blood_group = $_POST['BloodGroup'];
$password = $_POST['Password'];

// Update the patient data in the database
$query = "UPDATE patient SET 
    PatientName = '$patient_name',
    DateOfBirth = '$date_of_birth',
    Gender = '$gender',
    PhoneNo = '$phone_no',
    Email = '$email',
    Address = '$address',
    BloodGroup = '$blood_group',
    Password = '$password'
    WHERE Patient_ID = '$patient_id'";

if ($mysqli->query($query) === TRUE) {
    $response = array('success' => true, 'message' => 'Patient updated successfully');
} else {
    $response = array('success' => false, 'message' => 'Failed to update patient: ' . $mysqli->error);
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);

// Close the database connection
$mysqli->close();
?>
