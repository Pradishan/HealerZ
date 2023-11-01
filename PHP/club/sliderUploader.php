<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once '../classes/DBconnector.php'; 

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["file"])) {
    $db = new classes\DBconnector();
    $conn = $db->getConnection();

    if (!$conn) {
        die("Connection failed");
    }
    $file = $_FILES["file"];
    $fileName = $file["name"];
    $fileTmpName = $file["tmp_name"];
    
    $uploadPath = "upload_folder/" . $fileName;

    if (move_uploaded_file($fileTmpName, $uploadPath)) {
        $fileData = file_get_contents($uploadPath);
        $sql = "INSERT INTO slider (Image) VALUES (:fileData)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':fileData', $fileData, PDO::PARAM_LOB);

        if ($stmt->execute()) {
            echo "File uploaded successfully and added to the database.";
        } else {
            echo "File uploaded successfully but failed to add to the database: " . $stmt->errorInfo()[2];
        }

        $stmt->closeCursor();
    } else {
        echo "Error moving the uploaded file to the server.";
    }

    $conn = null; 
} else {
    echo "Invalid request.";
}
?>
