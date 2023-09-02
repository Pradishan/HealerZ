<?php
header("Access-Control-Allow-Origin: *"); 
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "Healerz"; 
$id = '';
 
$con = mysqli_connect($host, $user, $password,$dbname);
 
$method = $_SERVER['REQUEST_METHOD'];
 
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
  
switch ($method) {
    case 'GET':
        $sql = "SELECT drug.*, druginventory.StockCount 
        FROM drug
        LEFT JOIN druginventory ON drug.Drug_ID = druginventory.Drug_ID"; 
      break;
}
 
$result = mysqli_query($con,$sql);
 
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
 
if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
}else {
    echo mysqli_affected_rows($con);
}
 
$con->close();