  import React,{useState,useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import '../inventory.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateModal(props) {
    // const notify = () => toast("Item Updated Successfully!");
    const notify1 = () => toast("Item Deleted Successfully!");


 const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);

    const {Drug_ID} = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost/HealerZ/PHP/edit.php/${Drug_ID}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost/HealerZ/PHP/edit.php/${Drug_ID}/edit`, inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        
    }
    

    const { show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Drug UPDATE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr/>
                <form>
                    <table className={"ADDTable"}>
                        <tr>
                            <th>Drug_ID</th>
                            <th className={"inputfield"}> <p value={Drug_ID}></p><br/></th>
                        </tr>
                        <tr>
                            <th>Drug_Name</th>
                            <th className={"inputfield"}><input type={"text"} name={"Drug_Name"} placeholder={"XXXXXXXXXX"} className={"inputt"} onChange={handleChange} /><br/></th>
                        </tr>
                        <tr>
                            <th>Category</th>
                            <th className={"inputfield1"}><input type={"text"} name={"Category"} placeholder={"XXXXXXXXXX"} className={"inputt"} onChange={handleChange} /><br/></th>
                        </tr>
                        <tr>
                            <th>Dosage</th>
                            <th className={"inputfield"}><input type={"text"} name={"Drug_dosage"}  placeholder={"XXXmg"} className={"inputt"} onChange={handleChange} /><br/></th>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <th className={"inputfield"}><textarea name={"Descriptions"}  placeholder={"Type description here..."} className={"inputt"} rows={3} onChange={handleChange} /><br/></th>
                        </tr>
                    </table>
                </form>


                <hr/>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit} >Update</Button>
                <ToastContainer/>
                <Button variant="primary" onClick={notify1} >Delete</Button>
                <ToastContainer/>
            </Modal.Footer>
        </Modal>

    );
}

export default UpdateModal;