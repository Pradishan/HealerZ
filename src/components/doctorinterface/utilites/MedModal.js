import React from 'react';
import { Modal } from "react-bootstrap";

export default function MedModal(props) {
    const { show, onHide, id } = props;
    console.log(id);

    let medicalRecords = [];
    for (let i = 0; i < 20; i++) {
        medicalRecords.push({
            date: `${Math.floor(Math.random() * 31) + 1}-12-2013`, // Random status between 1 and 31
            complain: '"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.',
            examination: '"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.',
            tests: '"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.',
            diagnosis: '"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.',
            prescription: '"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.',
        })
    }

    return (
        <>
            <Modal size='xl' show={show} onHide={onHide} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Medical Records</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row" >

                        <div className="col-3"style={{maxHeight:'70vh',overflow:'auto'}}>
                            <nav id="datenavbar" className="h-10 flex-column align-items-stretch pe-4 border-end">
                                <nav className="nav nav-pills flex-column">
                                    {
                                        medicalRecords.map((record) => (
                                            <>
                                                <a className={`nav-link`} href={`#${record.date}`} >{record.date}</a>
                                            </>
                                        ))
                                    }
                                </nav>
                            </nav>
                        </div>

                        <div className="col-9" style={{maxHeight:'70vh',overflow:'auto'}} >
                            <div data-bs-spy="scroll" data-bs-target="#datenavbar" data-bs-smooth-scroll="true" className="scrollspy-example-2" tabIndex="0" >

                                {
                                    medicalRecords.map((record) => (
                                        <>
                                            <div id={record.date}>
                                                <p><span className='fw-bold'>Date : </span>{record.date}</p>
                                                <h5>Patient complain</h5>
                                                <p>{record.complain}</p>
                                                <h5>On examination  </h5>
                                                <p>{record.examination}</p>
                                                <h5>Tests</h5>
                                                <p>{record.tests}</p>
                                                <h5>Dignosis</h5>
                                                <p>{record.diagnosis}</p>
                                                <h5>Prescription</h5>
                                                <p>{record.prescription}</p>
                                                <hr />
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>


                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}
