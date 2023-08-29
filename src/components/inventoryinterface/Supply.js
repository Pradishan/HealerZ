import React, { useState } from "react";
import Layout from "../../layouts/layout";
import { Button} from "react-bootstrap";
import './inventory.css';
import SupplyModal from "./modals/SupplyModal";




function Supply(props) {
    const [showModal, setShowModal] = useState(false);
    const supplymodal = () => {
        setShowModal(!showModal);
    };
    const [searchTerm3, setSearchTerm] = useState('');
    const [searchTerm4, setSearchTerm2] = useState('');

    const handleChange3 = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleChange4 = (event) => {
        setSearchTerm2(event.target.value);
    };

    const handleSubmit3 = (event) => {
        event.preventDefault();
        console.log(`Searching for ${searchTerm3}...`);
    }
    const handleSubmit4 = (event) => {
        event.preventDefault();
        console.log(`Searching for ${searchTerm4}...`);
    }

    const [drugList1, setdrugList1] = useState([
        { No: 1, date: "07-07-2023", Prescription_ID: "PRT00026", Patient_ID: "CST20008", Patient_Name: "Powsi", status: "Pending" },
        { No: 2, date: "07-07-2023", Prescription_ID: "PRT00026", Patient_ID: "CST20008", Patient_Name: "Powsi", status: "Pending" },
        { No: 3, date: "07-07-2023", Prescription_ID: "PRT00026", Patient_ID: "CST20008", Patient_Name: "Powsi", status: "Pending" },
        { No: 4, date: "07-07-2023", Prescription_ID: "PRT00026", Patient_ID: "CST20008", Patient_Name: "Powsi", status: "Delivered" },
        { No: 5, date: "07-07-2023", Prescription_ID: "PRT00026", Patient_ID: "CST20008", Patient_Name: "Powsi", status: "Delivered" },
        { No: 6, date: "07-07-2023", Prescription_ID: "PRT00026", Patient_ID: "CST20008", Patient_Name: "Powsi", status: "Delivered" },
        { No: 7, date: "07-07-2023", Prescription_ID: "PRT00026", Patient_ID: "CST20008", Patient_Name: "Powsi", status: "Rejected" },
        { No: 8, date: "07-07-2023", Prescription_ID: "PRT00026", Patient_ID: "CST20008", Patient_Name: "Powsi", status: "Delivered" },
        { No: 9, date: "07-07-2023", Prescription_ID: "PRT00026", Patient_ID: "CST20008", Patient_Name: "Powsi", status: "Delivered" },
        { No: 10, date: "07-07-2023", Prescription_ID: "PRT00026", Patient_ID: "CST20008", Patient_Name: "Powsi", status: "Delivered" }


    ])

    return (
        <Layout>
            <div className={"container"}>
                <div className={"p-5"}>
                    <div className={"SearchSection"} style={{ display: 'flex', flexDirection: 'row' }}>
                        <div><h3 className={"content-heading"}>Filter the Results : </h3></div>
                        <div className={"SearchSection2"}>
                            <form onSubmit={handleSubmit3} style={{ display: 'flex', flexDirection: 'row' }}>

                                <input className={"SearchBox1"}
                                    type="text"
                                    placeholder="Patient_ID"
                                    value={searchTerm3}
                                    onChange={handleChange3}
                                />
                                <button type="submit" className="filterbutt" onClick={supplymodal}>Filter</button>

                            </form>
                            <form onSubmit={handleSubmit4} style={{ display: 'flex', flexDirection: 'row' }}>

                                <input className={"SearchBox1"}
                                    type="text"
                                    placeholder="Prescription_ID "
                                    value={searchTerm4}
                                    onChange={handleChange4}
                                />
                                <button type="submit" className="filterbutt" onClick={supplymodal}>Filter</button>

                            </form>
                        </div>

                    </div>
                    <div className={"table-container "}>
                        <table className={"table table-hover table-striped "}>
                            <thead className={"top-0 position-sticky h-45"}>
                                <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">DATE</th>
                                    <th scope="col">PRESCRIPTION_ID</th>
                                    <th scope="col">PATIENT_ID</th>
                                    <th scope="col">PATIENT_NAME</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {drugList1.map((data, index) => (<tr>
                                    <th scope="row">{data.No}</th>
                                    <td>{data.date}</td>
                                    <td>{data.Prescription_ID}</td>
                                    <td>{data.Patient_ID}</td>
                                    <td>{data.Patient_Name}</td>
                                    <td className={data.status === "Pending" ? "pending" : data.status === "Delivered" ? "delivered" : "rejected"}>{data.status}</td>
                                    <td>
                                        <Button variant="primary" className={"UpdtButt"} onClick={supplymodal}>Update</Button>
                                    </td>
                                </tr>))}

                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
            <SupplyModal show={showModal} onHide={supplymodal} />



        </Layout>
    );
}

export default Supply;