import React, { useState } from "react";
import ClubLayout from '../../layouts/ClubLayout'
import { Button, Col, Container, Row } from "react-bootstrap";
import Logosmall from "../../assets/logo-small.png";
import Card from "react-bootstrap/Card";
import HbloodReg from "../home/HbloodReg";
import '../inventoryinterface/inventory.css'


function Eventresponse(props) {
    const [searchTerm3, setSearchTerm] = useState('');
  
    const handleChange3 = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleSubmit3 = (event) => {
        event.preventDefault();
        // handle search logic here
        console.log(`Searching for ${searchTerm3}...`);
    }

    const [Registrationlist] = useState([
        { No: 1, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
        { No: 2, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
        { No: 3, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
        { No: 4, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
        { No: 5, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
        { No: 6, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
        { No: 7, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
        { No: 8, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
        { No: 9, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
        { No: 10, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
        { No: 11, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
        { No: 12, Registration_ID: "CST20083", Name: "nusnan", Email:"nusnanam12@gmail.com", Nic:"990000029v", Phone_No:"0767777123", Address:"05,main street,ampara" ,Event:"Blood Donation"},
    ])

    return (
        <ClubLayout>
            <Container>
                <Row>
                    <Col>
                        <Card className="Sliderr" style={{ width: '1070px', marginTop: '10px', marginLeft: '20px' }}>
                            <Card.Body style={{ display: 'flex', flexDirection: 'row' }}>
                                <Card.Title className="cardText1"><h1>Event Registration</h1></Card.Title>
                                <Card.Img variant="top" src={Logosmall}
                                    style={{ width: '130px', height: '130px', marginLeft: '500px' }} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <div className={"container"}>
                <div className={"p-5"}>
                    <div className={"SearchSection"} style={{ display: 'flex', flexDirection: 'row' }}>
                        <div><h4 className={"content-heading"}>Filter the Results : </h4></div>
                        <div className={"SearchSection2"}>
                            <form onSubmit={handleSubmit3} style={{ display: 'flex', flexDirection: 'row',marginLeft:'300px' }}>

                                <input className={"SearchBox1"}
                                    type="text"
                                    placeholder="Patient_ID"
                                    value={searchTerm3}
                                    onChange={handleChange3}
                                />
                                <button type="submit" className="filterbutt" onClick={HbloodReg}>Filter</button>

                            </form>

                        </div>

                    </div>
                    <div className={"table-container "}>
                        <table className={"table table-hover table-striped "}>
                            <thead className={"top-0 position-sticky h-45"}>
                                <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">Registration_ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Nic</th>
                                    <th scope="col">Phone_No</th>
                                    {/* <th scope="col">Address</th> */}
                                    <th scope="col">Event</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Registrationlist.map((data, index) => (<tr>
                                    <th scope="row">{data.No}</th>
                                    <td>{data.Registration_ID}</td>
                                    <td>{data.Name}</td>
                                    <td>{data.Email}</td>
                                    <td>{data.Nic}</td>
                                    <td>{data.Phone_No}</td>
                                    {/* <td>{data.Address}</td> */}
                                    <td>{data.Event}</td>
                                     
                                     <td>
                                        <Button variant="primary" className={"UpdtButt"} onClick={HbloodReg}>Update</Button>
                                    </td>
                                </tr>))}

                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
        </ClubLayout>
    );
}

export default Eventresponse;
