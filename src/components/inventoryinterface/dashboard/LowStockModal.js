
import React, {useState,useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import '../inventory.css';
import axios from "axios";

function LowStockModal(props) {

    const [lowdrugList, setDrugList] = useState([]);
    const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost/Healerz/PHP/Inventory/dashboard/lowstockdetail.php"
          );
          setDrugList(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);
    const { show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className="modaltitleee1" style={{ color: "rgb(171, 120, 0)" }}>Low Stock Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr/>
                <div className={"table-container-popup "} style={{ maxHeight: "350px", overflowY: "scroll" }}>
                    <table className={"table table-hover table-striped"} style={{minWidth: '0px'}}>
                        <thead className={"top-0 position-sticky h-45"}>
                        <tr>
                            <th scope="col">NO</th>
                            <th scope="col">NDC No</th>
                            <th scope="col">DRUG_NAME</th>
                            <th scope="col">Category</th>
                            <th scope="col">StockCount</th>
                        </tr>
                        </thead>
                        <tbody >
                        {lowdrugList.map((data, index) => (<tr>
                            <th scope="row">{index + 1}</th>
                            <td>{data.Drug_ID}</td>
                            <td>{data.Drug_Name}</td>
                            <td>{data.Category}</td>
                            <td>{data.StockCount}</td>
                        </tr>))}

                        </tbody>
                    </table>
                </div>
                <hr/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LowStockModal;
