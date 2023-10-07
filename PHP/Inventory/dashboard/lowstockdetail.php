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
      // $sql = "SELECT drug.*, druginventory.StockCount
      //   FROM drug
      //   INNER JOIN druginventory ON drug.Drug_ID = druginventory.Drug_ID
      //   WHERE drug.Drug_ID AND druginventory.StockCount <100 && StockCount!=0 ;"; 
      $sql = "SELECT drug.*, druginventory.StockCount
      FROM drug
      INNER JOIN druginventory ON drug.Drug_ID = druginventory.Drug_ID
        WHERE ((drug.Category = 'Tablet' AND druginventory.StockCount < 100)
            OR (drug.Category = 'Drops' AND druginventory.StockCount < 50)
            OR (drug.Category = 'Liquid' AND druginventory.StockCount < 70)
            OR (drug.Category = 'Capsules' AND druginventory.StockCount < 100)
            OR (drug.Category = 'Topical' AND druginventory.StockCount < 50)
            OR (drug.Category = 'Suppositories' AND druginventory.StockCount < 50)
            OR (drug.Category = 'Injections' AND druginventory.StockCount < 30)
            OR (drug.Category = 'Implants' AND druginventory.StockCount < 20))
        AND druginventory.StockCount != 0;";

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