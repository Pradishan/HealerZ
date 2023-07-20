import React ,{useState} from 'react';
import Layout from "../../layouts/layout";
import {Col, Container, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Logosmall from "../../assets/logo-small.png";
import FeatherIcon from 'feather-icons-react';
import './inventory.css';
import SearchBarID from "./SearchBarID";
import SearchBarName from "./SearchBarName";
import Modal from "./Modal";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";

function Inventory(props) {
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

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
            {No: 9, ID: "DRUG0018", name: "Citalopram", stock_in: 300, stock_out: 200, expire: 20, available: 550},
            {No: 10, ID: "DRUG0019", name: "Escitalopram", stock_in: 300, stock_out: 200, expire: 20, available: 550},
            {No: 11, ID: "DRUG0020", name: "Bupropion", stock_in: 300, stock_out: 200, expire: 20, available: 550},
            {No: 12, ID: "DRUG0028", name: "Metronidazole", stock_in: 300, stock_out: 200, expire: 20, available: 550},
            {No: 13, ID: "DRUG0029", name: "Carvedilol", stock_in: 300, stock_out: 200, expire: 20, available: 550},
            {No: 14, ID: "DRUG0030", name: "Risperidone", stock_in: 300, stock_out: 200, expire: 20, available: 550},
            {No: 15, ID: "DRUG0031", name: "Docusate", stock_in: 300, stock_out: 200, expire: 20, available: 550},
            {No: 16, ID: "DRUG0032", name: "Duloxetine", stock_in: 300, stock_out: 200, expire: 20, available: 550},
            {No: 17, ID: "DRUG0035", name: "Amiodarone", stock_in: 300, stock_out: 200, expire: 20, available: 550},
            {No: 18, ID: "DRUG0040", name: "Lisinopril", stock_in: 500, stock_out: 300, expire: 10, available: 250}
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
                        <div className={"SearchSection"} style={{display: 'flex', flexDirection: 'row'}}>
                            <div><h3 className={"content-heading"}>Filter the Results : </h3></div>
                            <div className={"SearchSection2"}>
                                <SearchBarID onSearch={handleSearch}/>
                                <SearchBarName onSearch={handleSearch1}/>
                            </div>

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
                                        <MDBBtn onClick={toggleShow}>
                                            <FeatherIcon className={"action-icons"} icon={"eye"} />
                                        </MDBBtn>
                                    </td>
                                </tr>))}

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

                <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Drug Detail</MDBModalTitle>
                                <MDBBtn
                                    className="btn-close"
                                    color="none"
                                    onClick={toggleShow}
                                ></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>

                                <hr/>
                                <table>
                                    <tr>
                                        <th>Drug_ID</th>
                                        <th>:</th>
                                        <th className={"detaildet"}>DRUG0001</th>
                                    </tr>
                                    <tr>
                                        <th>Drug_Name</th>
                                        <th>:</th>
                                        <th className={"detaildet"}>Aspirin</th>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <th>:</th>
                                        <th className={"detaildet"}>Category 1</th>
                                    </tr>
                                    <tr>
                                        <th>Dosage</th>
                                        <th>:</th>
                                        <th className={"detaildet"}>500mg</th>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <th>:</th>
                                        <th className={"detaildet"}>Aspirin is a commonly used medication classified as a nonsteroidal anti-inflammatory drug (NSAID). It is widely known for its pain-relieving, anti-inflammatory, and fever-reducing properties.</th>
                                    </tr>

                                </table>

                                <hr/>
                                <div>
                                    <div style={{display:"flex",flexDirection:'row'}}>
                                        <p style={{marginRight:"120px"}}>StockIn:</p>
                                        <p style={{marginRight:"120px"}}>StockOut:</p>
                                        <p>Expired:</p>
                                    </div>
                                    <div style={{marginLeft:"174px"}}>Stock_Count:</div>
                                </div>

                                <hr/>
                            </MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn onClick={toggleShow}>Cancel</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>


            </Layout>
        );
    }




export default Inventory;