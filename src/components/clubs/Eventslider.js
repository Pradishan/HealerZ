import { useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";



const fileTypes = ["JPEG", "PNG", "GIF"];

export default function Eventslider() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
 const handleSubmit = (file) => {
      
 }
  return (
    <Card style={{margin:'75px', width: '24rem' ,height:'220px',backgroundColor:'white' }}>
    <Card.Body>
      <Card.Title><h4 className="d-flex justify-content-center fw-bold">Slider Post</h4></Card.Title>
      <Card.Text style={{marginTop:'40px'}}>
      <FileUploader
                 multiple={true}
                 handleChange={handleChange}
                 name="file"
                 types={fileTypes}
             />  
      </Card.Text>
    </Card.Body>
    <Button className="primary" type="submit" name={"send"} value={"SEND"} onClick={handleSubmit} style={{backgroundColor:'green',width:'100px', marginBottom:'20px',marginLeft:'260px'}}>Post</Button>
  </Card>
  );
}
