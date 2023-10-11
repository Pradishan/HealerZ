<?php
header("Access-Control-Allow-Origin: *"); // Allow CORS for your React app
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$host = 'localhost';  // Host name, usually localhost
$db   = 'healerz';  // Database name
$user = 'root';  // Database username
$pass = '';  // Database password
$charset = 'utf8mb4';  // Charset

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

// Get data from POST request
//$data = json_decode(file_get_contents("php://input"));
//echo $data;
if (isset($_POST['id']) && isset($_POST['vaccinationType'])) {
    $id=$_POST['id'];
    $type=$_POST['vaccinationType'];
    $stmt = $pdo->prepare("SELECT DISTINCT * FROM vaccination_details WHERE PatientId = :id AND VaccinationName = :vaccinationType");
    $stmt->execute(['id' => $id, 'vaccinationType' => $type]);
    $result = $stmt->fetch();

    if ($result) {
        echo json_encode(["message" => "Vaccinated"]);
    } else {
       echo json_encode(["message" => "Not vaccinated"]);
      
    }
} else {
    echo json_encode(["message" => "Invalid data provided."]);
}
?>
