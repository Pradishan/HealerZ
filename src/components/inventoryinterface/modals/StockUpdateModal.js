import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../inventory.css";

function StockUpdateModal(props) {
    const MySwal = withReactContent(Swal);
    const { show, onHide } = props;

    const items = props.inputs;

    const [Stock_IN, setStk] = useState('');
    const [ExpiredDate, setDate] = useState('');
    const [Drug_ID, setID] = useState('');

    useEffect(() => {
        if (items.length > 0) {
            setID(items[0].Drug_ID); // Set the Drug_ID automatically
        }
    }, [items]);

    const handleAdd = () => {
        if (Drug_ID === '') {
            toast.error("Please select a drug.");
        } else if (Stock_IN.length === 0) {
            toast.error("Please enter the Stock Count.");
        } else if (ExpiredDate.length === 0) {
            toast.error("Please enter the Expired Date.");
        } else {
            const url = "http://localhost/HealerZ/PHP/stockupdate.php";
            let fdata = new FormData();
            fdata.append('Drug_ID', Drug_ID);
            fdata.append('StockCount', Stock_IN);
            fdata.append('ExpiredDate', ExpiredDate);

            axios.post(url, fdata)
                .then((response) => {
                    // Show success swal notification
                    MySwal.fire({
                        icon: "success",
                        title: response.data,
                        customClass: {
                            container: "sweetalert-container",
                        },
                    });
                })
                .catch((error) => {
                    // Show error swal notification
                    MySwal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.message,
                        customClass: {
                            container: "sweetalert-container",
                        },
                    });
                });
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Stock UPDATE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr />
                <table>
                    <tbody>
                        {items.map((item) => (
                            <React.Fragment key={item.Drug_ID}>
                                <tr>
                                    <th>Drug_ID</th>
                                    <th>:</th>
                                    <th className={"detaildet"} name={"Drug_ID"}>
                                        {item.Drug_ID}
                                    </th>
                                </tr>
                                <tr>
                                    <th>Drug_Name</th>
                                    <th>:</th>
                                    <th className={"detaildet"}>{item.Drug_Name}</th>
                                </tr>
                                <tr>
                                    <th>Availability</th>
                                    <th>:</th>
                                    <th className={"detaildet"}>500</th>
                                </tr>
                                {/* Add more rows for other details as needed */}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <hr />
                <div>
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Stock_In</th>
                                    <td className={"inputfield"}>
                                        <input
                                            type={"number"}
                                            name={"StockCount"}
                                            className={"inputt"}
                                            onChange={(e) => setStk(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Expired_Date</th>
                                    <td className={"inputfield"}>
                                        <input
                                            type={"date"}
                                            name={"ExpiredDate"}
                                            className={"inputt"}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <hr />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleAdd}>Update</Button>
                <ToastContainer />
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StockUpdateModal;
