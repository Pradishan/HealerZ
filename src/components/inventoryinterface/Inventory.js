import React ,{useState} from 'react';
import Layout from "../../layouts/layout";
import {Col, Container, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Logosmall from "../../assets/logo-small.png";
import FeatherIcon from 'feather-icons-react';
import './inventory.css';
import SearchBarID from "./SearchBarID";
import SearchBarName from "./SearchBarName";

function Inventory(props) {
        const handleSearch = (searchTerm) => {
            // Perform search logic using the search term
            console.log('Search term:', searchTerm);
        };
    const handleSearch1 = (searchTerm1) => {
        // Perform search logic using the search term
        console.log('Search term:', searchTerm1);
    };
        const [drugList, setdrugList] = useState([
            {No: 1, ID: "DRUG0001", name: "Aspirin", stock_in: 500, stock_out: 100, expire: 50, available: 350},
            {No: 2, ID: "DRUG0002", name: "Ibuprofen", stock_in: 1000, stock_out: 300, expire: 10, available: 600},
            {No: 3, ID: "DRUG0003", name: "Acetaminophen", stock_in: 1500, stock_out: 200, expire: 50, available: 350},
            {No: 4, ID: "DRUG0005", name: "Amoxicillin", stock_in: 1000, stock_out: 200, expire: 30, available: 450},
            {No: 5, ID: "DRUG0006", name: "Atorvastatin", stock_in: 500, stock_out: 200, expire: 20, available: 750},
            {No: 6, ID: "DRUG0010", name: "Metformin", stock_in: 700, stock_out: 50, expire: 50, available: 250},
            {No: 7, ID: "DRUG0016", name: "Omeprazole", stock_in: 200, stock_out: 70, expire: 100, available: 300},
            {No: 8, ID: "DRUG0017", name: "Sertraline", stock_in: 500, stock_out: 300, expire: 0, available: 250},
            {No: 9, ID: "DRUG0018", name: "Sertraline", stock_in: 300, stock_out: 200, expire: 20, available: 550},
            {No: 10, ID: "DRUG0025", name: "Lisinopril", stock_in: 500, stock_out: 300, expire: 10, available: 250}
        ])
        // console.log(drugList)
        // console.log(drugList[0])


        return (
            <Layout>
                <Container>
                    <Row>
                        <Col>
                            <Card className="Sliderr" style={{width: '1070px', marginTop: '10px', marginLeft: '20px'}}>

                                <Card.Body style={{display: 'flex', flexDirection: 'row'}}>
                                    <Card.Title className="cardText1">Inventory</Card.Title>
                                    <Card.Img variant="top" src={Logosmall}
                                              style={{width: '150px', height: '150px', marginLeft: '400px'}}/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <div className={"container"}>
                    <div className={"p-5"}>
                        <div className={"students_marks_container "} style={{display: 'flex', flexDirection: 'row'}}>
                            <div><h3 className={"content-heading"}>Filter the Results</h3></div>
                            <SearchBarID onSearch={handleSearch}/>
                            <SearchBarName onSearch={handleSearch1}/>
                        </div>
                        <div className={"table-container "}>
                            <table className={"table table-hover table-striped "}>
                                <thead className={"top-0 position-sticky h-45"}>
                                <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">DRUG_ID</th>
                                    <th scope="col">DRUG_NAME</th>
                                    <th scope="col">STOCK_IN</th>
                                    <th scope="col">STOCK_OUT</th>
                                    <th scope="col">EXPIRED_COUNT</th>
                                    <th scope="col">AVAILABLE_COUNT</th>
                                    <th scope="col">VIEW</th>
                                </tr>
                                </thead>
                                <tbody>
                                {drugList.map((data, index) => (<tr>
                                    <th scope="row">{data.No}</th>
                                    <td>{data.ID}</td>
                                    <td>{data.name}</td>
                                    <td>{data.stock_in}</td>
                                    <td>{data.stock_out}</td>
                                    <td>{data.expire}</td>
                                    <td>{data.available}</td>
                                    <td>
                                        <FeatherIcon className={"action-icons"} icon={"eye"}/>
                                    </td>
                                </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </Layout>
        );
    }




export default Inventory;