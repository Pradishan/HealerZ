import React, { useState } from "react";
import Layout from "../../layouts/layout";
import StockUpdateModal from "./StockUpdateModal";



function Supply(props) {
    const [showModal, setShowModal] = useState(false);
    const addModal = () => {
        setShowModal(!showModal);
    };
    return (
        <Layout>
           <button onClick={addModal}>ok</button>
            <StockUpdateModal show={showModal} onHide={addModal}/>
        </Layout>
    );
}

export default Supply;