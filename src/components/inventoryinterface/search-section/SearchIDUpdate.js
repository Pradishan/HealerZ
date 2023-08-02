import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import '../inventory.css';
import 'react-toastify/dist/ReactToastify.css';
import UpdateModal from "../modals/UpdateModal";
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchIDUpdate(props) {
    const [showModal, setShowModal] = useState(false);
    const [Drug_ID, setSearchTerm] = useState('');
    const [inputs, setInputs] = useState({});
    // const [displayDetails, setDisplayDetails] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
  

    const handleSubmit = (event) => {
        event.preventDefault();
        getUser();
    };

    function getUser() {
        axios.get(`http://localhost/HealerZ/PHP/display.php?Drug_ID=${Drug_ID}`)
            .then(function(response) {
                console.log(response.data);
                setInputs(response.data);
                if(response.data==0){
                    toast.error("Invalid Drug_ID");
                    // setShowModal(false);
                    // setSearchResults(response.data);
                   
                }else{
                    // setShowModal(true); // Show the modal after getting the response
                    
                    setSearchResults(response.data);
                }
                   
                
                
            })
            .catch(function(error) {
                console.error(error);
            });
    }


    const handleUpdate = () => {
        // Perform the update action here using the inputs state
        // Example: You can use axios to send a POST request to your backend PHP script with the updated data.
        axios.post(`http://localhost/HealerZ/PHP/update.php`, inputs)
            .then(function (response) {
                console.log(response.data);
                // Handle the success notification here
                alert(response.data);
            })
            .catch(function (error) {
                alert(error);
            });
    };


    // const UpdateModal1 = () => {
    //     setShowModal(!showModal);
    // };

    const { show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide} className={"moddd"}>
            <Modal.Header closeButton>
                <Modal.Title>Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"SearchSection"} style={{ display: 'flex', flexDirection: 'row' }}>
                    <div><h3 className={"content-heading1"}>Search DRUG ID:</h3></div>
                    <div className={"SearchSection3"}>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="SearchBox1"
                                type="text"
                                placeholder="DRUG_ID"
                                value={Drug_ID}
                                onChange={handleChange}
                            />
                            <button type="submit" className="filterbutt">Search</button>
                        </form>
                    </div>
                </div>

               
        {searchResults.map(item => (
          <p key={item.Drug_ID}>
            <hr />
                <form>
                    <table className={"ADDTable"}>
                        <tbody>
                            <tr>
                                <th>Drug_ID</th>
                                <th className={"inputfield"}>
                                    <input
                                        type={"text"}
                                        name={"Drug_ID"}
                                        value={item.Drug_ID}
                                        className={"inputt"}
                                        
                                    />
                                    <br />
                                </th>
                            </tr>
                            <tr>
                                <th>Drug_Name</th>
                                <th className={"inputfield"}>
                                    <input
                                        type={"text"}
                                        name={"Drug_Name"}
                                        
                                        placeholder={item.Drug_Name}
                                        className={"inputt"}
                                       
                                    />
                                    <br />
                                </th>
                            </tr>
                            <tr>
                                <th>Category</th>
                                <th className={"inputfield1"}>
                                    <input
                                        type={"text"}
                                        name={"Category"}
                                        
                                        placeholder={item.Category}
                                        className={"inputt"}
                                       
                                    />
                                    <br />
                                </th>
                            </tr>
                            <tr>
                                <th>Dosage</th>
                                <th className={"inputfield"}>
                                    <input
                                        type={"text"}
                                        name={"Drug_dosage"}
                                        placeholder={item.Drug_dosage}
                                        className={"inputt"}
                                        
                                    />
                                    <br />
                                </th>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <th className={"inputfield"}>
                                    <textarea
                                        name={"Descriptions"}
                                        
                                        placeholder={item.Descriptions}
                                        className={"inputt"}
                                        rows={3}
                                       
                                    />
                                    <br />
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <hr />
          </p>
        ))}
      
                {/* {showModal && <UpdateModal show={showModal} onHide={UpdateModal1} inputs={inputs} />} */}
                <ToastContainer/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUpdate}>Update</Button>
                <ToastContainer />
                <Button variant="primary">Delete</Button>
                <ToastContainer />
            </Modal.Footer>
        </Modal>
       
    );
}

export default SearchIDUpdate;
