
import React from 'react';
import { Icon } from '@iconify/react';
import './card.css';
import HbloodReg from './HbloodReg';

export default function Hcard(){
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card text-center cardhome">
                            <Icon icon="game-icons:love-injection" width={100} height={120} className="m-auto icon"/>
                            <h1 className="title"> vaccination</h1>
                            <button className="btn ">Register here</button>
                    </div>
                </div>
                <div className="col">
                    <div className="card text-center cardhome">
                            <Icon icon="mdi:hand-blood" width={100} height={120} className=" m-auto icon"/>
                            <h1 className="title">Blood donation</h1>
                            <button className="btn" >Register here</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}