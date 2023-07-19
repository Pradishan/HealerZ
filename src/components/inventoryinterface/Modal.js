import React, { useState } from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";

export default function Modal() {
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    return (
        <>
            {/*<MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn>*/}
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Drug Detail</MDBModalTitle>
                            <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={toggleShow}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                            <hr/>
                            <table>
                                <tr>
                                    <th>Drug_ID</th>
                                    <th>:</th>
                                    <th>Drug_ID</th>
                                </tr>
                                <tr>
                                    <th>Drug_Name</th>
                                    <th>:</th>
                                    <th>Drug_ID</th>
                                </tr>
                                <tr>
                                    <th>Category</th>
                                    <th>:</th>
                                    <th>Drug_ID</th>
                                </tr>
                                <tr>
                                    <th>Dosage</th>
                                    <th>:</th>
                                    <th>Drug_ID</th>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <th>:</th>
                                    <th>Drug_ID</th>
                                </tr>
                            </table>

                            <hr/>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}