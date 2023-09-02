import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../inventory.css";

function StockUpdateModal(props) {
   
    const { show, onHide } = props;

    const items = props.inputs;

    const [Stock_IN, setStk] = useState('');
    const [ExpiredDate, setDate] = useState('');
    const [Drug_ID, setID] = useState('');

    useEffect(() => {
        if (items.length > 0) {
            setID(items[0].Drug_ID);
        }
    }, [items]);

    const handleAdd = () => {
        if (Drug_ID === '') {
            toast.warning("Please select a drug.");
        } else if (Stock_IN.length === 0) {
            toast.warning("Please enter the Stock Count.");
        } else if (ExpiredDate.length === 0) {
            toast.warning("Please enter the Expired Date.");
        } else {
            const url = "http://localhost/HealerZ/PHP/Inventory/stockupdate.php";
            let fdata = new FormData();
            fdata.append('Drug_ID', Drug_ID);
            fdata.append('StockCount', Stock_IN);
            fdata.append('ExpiredDate', ExpiredDate);

            axios.post(url, fdata)
                .then((response) => {
                    toast.success("Stock Updated Successfully.!");
                    onHide();
                   
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title className="modaltitleee">Stock UPDATE</Modal.Title>
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
                                    <th className={"detaildet"}>{item.StockCount}</th>
                                </tr>
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
                <Button variant="primary uptbut" onClick={handleAdd} style={{backgroundColor:'green'}}>Update</Button>
                <ToastContainer />
                <Button variant="primary uptbut" onClick={onHide} style={{backgroundColor:'blue'}}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StockUpdateModal;
