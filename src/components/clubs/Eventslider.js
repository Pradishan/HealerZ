import { useState } from "react";
import { Card } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";


const fileTypes = ["JPEG", "PNG", "GIF"];

export default function Eventslider() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <Card style={{margin:'75px', width: '24rem' ,height:'220px',backgroundColor:'white' }}>
    <Card.Body>
      <Card.Title><h3>Slider Post</h3></Card.Title>
      <Card.Text style={{marginTop:'50px'}}>
      <FileUploader
                 multiple={true}
                 handleChange={handleChange}
                 name="file"
                 types={fileTypes}
             />  
      </Card.Text>
    </Card.Body>
  </Card>
  );
}
