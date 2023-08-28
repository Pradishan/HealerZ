<?php
// Check if the file has been uploaded
if (isset($_FILES["image"])) {
    $target_dir = "uploads/"; // Directory where images will be stored
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if the image file is a valid image
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if ($check !== false) {
        // Check if the file already exists
        if (file_exists($target_file)) {
            echo "Sorry, the file already exists.";
            $uploadOk = 0;
        }

        // Check file size (optional)
        if ($_FILES["image"]["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }

        // Allow certain file formats
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        } else {
            // If everything is ok, try to upload file
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                // Get Pharmacist_ID (e.g., "powsi") from your session or request data
                $pharmacistID = "powsi";

                // Database connection
                $servername = "localhost";
                $username = "root";
                $password = "";
                $dbname = "healerz";

                // Create connection
                $conn = new mysqli($servername, $username, $password, $dbname);

                // Check connection
                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }

                // Prepare and execute SQL query to insert the image path into the database
                $imagePath = $target_file;
                $sql = "INSERT INTO pharmacist (Pharmacist_ID, image) VALUES (?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ss", $pharmacistID, $imagePath);

                if ($stmt->execute()) {
                    echo "The file " . htmlspecialchars(basename($_FILES["image"]["name"])) . " has been uploaded and saved in the database.";
                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }

                // Close the statement and the database connection
                $stmt->close();
                $conn->close();
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    } else {
        echo "File is not an image.";
    }
} else {
    echo "No file was uploaded.";
}
?>
