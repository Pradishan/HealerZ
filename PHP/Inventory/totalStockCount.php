<?php
// Include the database connection code here (from step 1).
$servername = "localhost";
$username = "root";
$password = "";
$database = "Healerz";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['Drug_ID'])) {
        $drugID = $_GET['Drug_ID'];

        $sql = "SELECT SUM(StockCount) as TotalStockCount FROM druginventory WHERE Drug_ID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $drugID);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $totalStockCount = $row['TotalStockCount'];

            // Calculate the total available count for all drugs
            $sqlTotalAvailable = "SELECT SUM(StockCount) as TotalAvailableCount FROM druginventory";
            $resultTotalAvailable = $conn->query($sqlTotalAvailable);
            $rowTotalAvailable = $resultTotalAvailable->fetch_assoc();
            $totalAvailableCount = $rowTotalAvailable['TotalAvailableCount'];

            echo json_encode(['totalStockCount' => $totalStockCount, 'totalAvailableCount' => $totalAvailableCount]);
        } else {
            echo json_encode(['error' => 'Drug not found']);
        }

        $stmt->close();
    } else {
        echo json_encode(['error' => 'Drug_ID parameter is missing']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

$conn->close();
?>
