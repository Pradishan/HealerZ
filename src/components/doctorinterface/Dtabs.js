import React from 'react';
import TestPage from './pages/TestPage.js';
import EmailPage from './pages/EmailPage.js';
import MedicalPage from './pages/MedicalPage.js';

export default function Dtabs(props) {
    const { selectedId } = props;
    return (
        <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item nav-hover" role="presentation">
                    <button className="nav-link active text-dark" id="test-tab" data-bs-toggle="tab" data-bs-target="#test-tab-pane" type="button" role="tab" aria-controls="test-tab-pane" aria-selected="true"><p className='m-0'>Test</p></button>
                </li>
                <li className="nav-item nav-hover" role="presentation">
                    <button className="nav-link text-dark" id="email-tab" data-bs-toggle="tab" data-bs-target="#email-tab-pane" type="button" role="tab" aria-controls="email-tab-pane" aria-selected="false"><p className='m-0'>Email</p></button>
                </li>
                <li className="nav-item nav-hover" role="presentation">
                    <button className="nav-link text-dark" id="medical-tab" data-bs-toggle="tab" data-bs-target="#medical-tab-pane" type="button" role="tab" aria-controls="medical-tab-pane" aria-selected="false"><p className='m-0'>Medical</p></button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="test-tab-pane" role="tabpanel" aria-labelledby="test-tab" tabIndex="0"><TestPage selectedId = {selectedId} /></div>
                <div className="tab-pane fade" id="email-tab-pane" role="tabpanel" aria-labelledby="email-tab" tabIndex="0"><EmailPage selectedId = {selectedId}/></div>
                <div className="tab-pane fade" id="medical-tab-pane" role="tabpanel" aria-labelledby="medical-tab" tabIndex="0"><MedicalPage /></div>
            </div>
        </>
    )
}
