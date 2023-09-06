import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import ViewModal from './modals/ViewModal';
import Layout from '../../layouts/layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './inventory.css';

function Inventory(props) {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm3, setSearchTerm] = useState('');
    const [searchTerm4, setSearchTerm2] = useState('');
    const [drugList, setDrugList] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState(null);

    const handleChange3 = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChange4 = (event) => {
        setSearchTerm2(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const searchedDrug = drugList.find(drug => drug.Drug_ID === searchTerm3); // Search for the drug by ID
        if (searchedDrug) {
            setSelectedDrug(searchedDrug);
            setShowModal(true);
            setSearchTerm('');
        } else {
            toast.error('Invalid Drug ID');
        }
    };
    const handleSearchSubmit2 = (event) => {
        event.preventDefault();
        const searchedDrug = drugList.find(drug => drug.Drug_Name === searchTerm4); // Search for the drug by Name
        if (searchedDrug) {
            setSelectedDrug(searchedDrug);
            setShowModal(true);
            setSearchTerm2('');
        } else {
            toast.error('Invalid Drug Name');
        }
    };

    const openModal = (drug) => {
        setSelectedDrug(drug);
        setShowModal(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost/Healerz/PHP/Inventory/displaydrugs.php');
            setDrugList(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    return (
        <Layout>
            <div className={"container"}>
                <div className={"p-5"}>
                    <div className={"SearchSection"} style={{ display: 'flex', flexDirection: 'row' }}>
                        <div><h3 className={"content-heading"}>Filter the Results : </h3></div>
                        <div className={"SearchSection2"}>
                            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
                                <input
                                    className={"SearchBox1"}
                                    type="text"
                                    placeholder="NDC Number"
                                    value={searchTerm3}
                                    onChange={handleChange3}
                                />
                                <button type="submit" className="filterbutt">Filter</button>
                            </form>
                            <form onSubmit={handleSearchSubmit2} style={{ display: 'flex', flexDirection: 'row' }}>
                                <input
                                    className={"SearchBox1"}
                                    type="text"
                                    placeholder="DRUG_Name"
                                    value={searchTerm4}
                                    onChange={handleChange4}
                                />
                                <button type="submit" className="filterbutt">Filter</button>
                            </form>
                        </div>
                    </div>
                    <div className={"table-container w-100 p-0"}>
                        <table className={"table table-hover table-striped "} style={{minWidth: '0px',}}>
                            <thead className={"top-0 position-sticky h-45"}>
                                <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">NDC No</th>
                                    <th scope="col">DRUG_NAME</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Drug_Dosage</th>
                                    <th scope="col">EXPIRED_COUNT</th>
                                    <th scope="col">AVAILABLE_COUNT</th>
                                    <th scope="col">VIEW</th>
                                </tr>
                            </thead>
                            <tbody className='h-50'>
                                {drugList.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.Drug_ID}</td>
                                        <td>{data.Drug_Name}</td>
                                        <td>{data.Category}</td>
                                        <td>{data.Drug_dosage}</td>
                                        <td>{index *5 + 10}</td>
                                        <td>{data.StockCount}</td>
                                        <td>
                                            <FeatherIcon
                                                className={"viewbutt"}
                                                icon={"eye"}
                                                onClick={() => openModal(data)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <ViewModal
                show={showModal}
                onHide={() => setShowModal(false)}
                drugDetails={selectedDrug}
            />
        </Layout>
    );
}

export default Inventory;
