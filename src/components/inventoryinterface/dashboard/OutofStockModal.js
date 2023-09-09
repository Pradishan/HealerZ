
import React, {useState,useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import '../inventory.css';
import axios from "axios";
import { IconButton } from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";


function OutofStockModal(props) {

    const [lowdrugList, setDrugList] = useState([]);
    const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost/Healerz/PHP/Inventory/dashboard/outofstockdetail.php"
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
            <Modal.Header>
                <Modal.Title className="modaltitleee1" style={{ color: "rgb(219, 4, 4)" }}>Out of Stock Details</Modal.Title>
                <IconButton   style={{color:'rgb(219, 4, 4)'}}><ProductionQuantityLimitsIcon sx={{ fontSize: "40px" }}/></IconButton>
            </Modal.Header>
            <Modal.Body>
                <hr/>
                <div className={"table-container-popup "} style={{ maxHeight: "250px", overflowY: "scroll" }}>
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

export default OutofStockModal;
