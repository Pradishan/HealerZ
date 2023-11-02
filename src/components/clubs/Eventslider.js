import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Axios from "axios";

export default function Eventslider() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await Axios.post(
        "http://localhost/Healerz/PHP/club/sliderUploader.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("File uploaded successfully.");
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    }
  };

  return (
    <Card style={{ margin: "75px", width: "24rem", backgroundColor: "white" }}>
      <Card.Body>
        <Card.Title>
        <h3 className="bdhedchechhead">Slider Post</h3>
        <hr/>
        </Card.Title>
        <input type="file" accept="*/*" onChange={handleFileChange} />
        <hr/>
        <Button
          variant="success"
          onClick={handleSubmit}
          style={{ width: "100%", margin: "20px auto", display: "block" }}
        >
          Post
        </Button>
      </Card.Body>
    </Card>
  );
}
