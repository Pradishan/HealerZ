// ViewModal.js
import React,{useState} from "react";
import { Modal, Button } from "react-bootstrap";
import '../inventory.css';
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

function StockUpdateModal(props) {
    const MySwal = withReactContent(Swal);
    const { show, onHide } = props;

    const items = props.inputs;

    const [Stock_IN, setStk] = useState('');
    const [ExpiredDate, setDate] = useState('');
    const [Drug_ID, setID] = useState('');


    const handleAdd= ()=>{
        if (Stock_IN.length === 0) {
            toast.error("Pls Enter the StockCount");

        } else if (ExpiredDate.length === 0) {
            toast.error("Pls Enter the Expired Date");

        }
        else {
            const url = "http://localhost/HealerZ/PHP/stockupdate.php";
            let fdata = new FormData();
            fdata.append('Drug_ID', Drug_ID);
            fdata.append('StockCount', Stock_IN);
            fdata.append('ExpiredDate', ExpiredDate);
            // axios.post(url,fdata)
            // .then(response=>alert(response.data))
            // .catch(error=>alert(error));

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

    }




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
                                    <th className={"detaildet"} name={"Drug_ID"}>{item.Drug_ID}</th>
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
                            </React.Fragment>
                        ))}
                    </tbody>

                </table>

                <hr />
                <div>
                    <form>
                        <table>
                            <tr>
                                <th>Stock_In</th>
                                <th className={"inputfield"}>
                                    <input
                                        type={"number"}
                                        name={"StockCount"}
                                        className={"inputt"}
                                        onChange={(e) => setStk(e.target.value)}
                                    />
                                    <br />
                                </th>
                            </tr>
                            <tr>
                                <th>Expired_Date</th>
                                <th className={"inputfield"}>
                                    <input
                                        type={"date"}
                                        name={"ExpiredDate"}
                                        className={"inputt"}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <br />
                                </th>
                            </tr>
                        </table>
                    </form>
                </div>

                <hr />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleAdd} >Update</Button>
                <ToastContainer />
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StockUpdateModal;
