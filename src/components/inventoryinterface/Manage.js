import React, {useState} from 'react';
import Layout from "../../layouts/layout";
import {Container} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import AddModal from "./modals/AddModal";
import SearchModal from "./search-section/SearchIDStkUpdate";
import SearchIDUpdate from "./search-section/SearchIDUpdate";

function Manage(props) {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);

    const addModal = () => {
        setShowModal(!showModal);
    };
    const searchModal = () => {
        setShowModal2(!showModal2);
    };
    const searchModal2 = () => {
        setShowModal3(!showModal3);
    };

    return (
        <Layout>
             <h3 className='serhedd'>Access</h3>
            <Container className="Managebutt">
                <div style={{display:"flex",flexDirection:'row'}}>
                        <Card className="Managebutt1" onClick={addModal} >
                            <Card.Body>
                                <Card.Title className="CardTitle">DRUG ADD</Card.Title>
                                <svg  className="Managebuttimg" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                    <path d="M35 0C15.6653 0 0 15.6653 0 35C0 54.3347 15.6653 70 35 70C54.3347 70 70 54.3347 70 35C70 15.6653 54.3347 0 35 0ZM55.3226 38.9516C55.3226 39.8831 54.5605 40.6452 53.629 40.6452H40.6452V53.629C40.6452 54.5605 39.8831 55.3226 38.9516 55.3226H31.0484C30.1169 55.3226 29.3548 54.5605 29.3548 53.629V40.6452H16.371C15.4395 40.6452 14.6774 39.8831 14.6774 38.9516V31.0484C14.6774 30.1169 15.4395 29.3548 16.371 29.3548H29.3548V16.371C29.3548 15.4395 30.1169 14.6774 31.0484 14.6774H38.9516C39.8831 14.6774 40.6452 15.4395 40.6452 16.371V29.3548H53.629C54.5605 29.3548 55.3226 30.1169 55.3226 31.0484V38.9516Z" fill="black"/>
                                </svg>


                            </Card.Body>
                        </Card>
                        <Card className="Managebutt1" style={{marginLeft:'200px'}} onClick={searchModal2}>

                            <Card.Body>
                                <Card.Title className="CardTitle"> DRUG UPDATE</Card.Title>
                                <svg className="Managebuttimg" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                    <path d="M25.2329 35.807C25.6748 37.7207 23.5755 39.1751 21.9424 38.1542L16.373 34.6741L9.41852 45.8032C7.60234 48.7092 9.70152 52.5 13.1266 52.5H20.2343C21.1404 52.5 21.875 53.2346 21.875 54.1406V59.6093C21.875 60.5154 21.1404 61.2499 20.2343 61.2499H13.1407C2.84111 61.2499 -3.44358 49.8957 2.01068 41.1687L8.959 30.0415L3.39113 26.5623C1.73943 25.5305 2.16531 23.0129 4.05818 22.5758L19.1297 19.0964C20.3069 18.8246 21.4814 19.5586 21.7532 20.7356L25.2329 35.807ZM38.7081 10.7992L44.353 19.833L38.7831 23.3134C37.1355 24.3427 37.5527 26.8617 39.4502 27.2999L54.5216 30.7794C55.7073 31.0527 56.8753 30.3093 57.1451 29.1401L60.6246 14.0687C61.0617 12.1759 58.9854 10.6891 57.3341 11.7215L51.7714 15.1974L46.13 6.16279C41.0002 -2.04483 29.0116 -2.06369 23.87 6.16279L21.4141 10.0956C20.9342 10.864 21.168 11.8758 21.9364 12.356L26.5737 15.2537C27.3421 15.7339 28.3543 15.5003 28.8345 14.7319L31.2901 10.8022C33.0281 8.02121 37.0286 8.11212 38.7081 10.7992ZM67.9886 41.1687L64.2268 35.1442C63.7467 34.3755 62.7343 34.1415 61.9657 34.6218L57.3363 37.5147C56.5679 37.9948 56.3341 39.0069 56.8143 39.7754L60.5828 45.8064C62.3953 48.7063 60.3016 52.5001 56.8728 52.5001H43.75V45.9402C43.75 43.997 41.3927 43.0168 40.0158 44.3935L29.0783 55.3284C28.2239 56.1826 28.2239 57.5677 29.0783 58.4219L40.0158 69.3579C41.3832 70.7256 43.75 69.7675 43.75 67.8109V61.2499H56.8586C67.15 61.2499 73.4474 49.9027 67.9886 41.1687Z" fill="black"/>
                                </svg>


                            </Card.Body>
                        </Card>

                </div>
                <div style={{marginTop:'50px',marginLeft:'250px', marginBottom:'50px'}} onClick={searchModal}>
                        <Card className="Managebutt1">

                            <Card.Body>
                                <Card.Title className="CardTitle">STOCK UPDATE</Card.Title>
                                <svg  className="Managebuttimg" xmlns="http://www.w3.org/2000/svg" width="71" height="70" viewBox="0 0 71 70" fill="none">
                                    <path d="M63.9375 14H53V7C53 3.13542 50.0605 0 46.4375 0H24.5625C20.9395 0 18 3.13542 18 7V14H7.0625C3.43945 14 0.5 17.1354 0.5 21V63C0.5 66.8646 3.43945 70 7.0625 70H63.9375C67.5605 70 70.5 66.8646 70.5 63V21C70.5 17.1354 67.5605 14 63.9375 14ZM26.75 9.33333H44.25V14H26.75V9.33333ZM48.625 45.5C48.625 46.1417 48.1328 46.6667 47.5312 46.6667H39.875V54.8333C39.875 55.475 39.3828 56 38.7812 56H32.2188C31.6172 56 31.125 55.475 31.125 54.8333V46.6667H23.4688C22.8672 46.6667 22.375 46.1417 22.375 45.5V38.5C22.375 37.8583 22.8672 37.3333 23.4688 37.3333H31.125V29.1667C31.125 28.525 31.6172 28 32.2188 28H38.7812C39.3828 28 39.875 28.525 39.875 29.1667V37.3333H47.5312C48.1328 37.3333 48.625 37.8583 48.625 38.5V45.5Z" fill="black"/>
                                </svg>


                            </Card.Body>
                        </Card>
                </div>
            </Container>
            <AddModal show={showModal} onHide={addModal} />
            <SearchModal show={showModal2} onHide={searchModal}/>
            <SearchIDUpdate show={showModal3} onHide={searchModal2}/>
          
        </Layout>
    );
}

export default Manage;