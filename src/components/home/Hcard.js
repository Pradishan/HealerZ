
import React from 'react';
import { Icon } from '@iconify/react';
import './Home.css';
import { useState } from 'react';
import HvacciReg from './HvacciReg';
import HbloodReg from './HbloodReg';

export default function Hcard() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='events' id='events'>
                <div className="container text-center mt-2">
                    <h1 className='serhed'>EVENTS</h1>
                    <div className="container text-center mt-2 contgap1">
                        <div className="row  cardcontainer2">
                            <div className="col">
                                <div className="card cardWrap2">
                                    <Icon icon="game-icons:love-injection" width={100} height={120} className="m-auto icon" />
                                    <h1 className="title"> vaccination</h1>
                                    <HvacciReg onClick={handleShow}></HvacciReg>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card cardWrap2">
                                    <Icon icon="mdi:hand-blood" width={100} height={120} className=" m-auto icon" />
                                    <h1 className="title">Blood donation</h1>
                                    <HbloodReg onClick={handleShow}></HbloodReg>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}