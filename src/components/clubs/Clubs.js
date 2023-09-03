import React from 'react';
import ClubLayout from '../../layouts/ClubLayout';
import Card from 'react-bootstrap/Card';
import Eventslider  from './Eventslider';
import '../admin/Admin.css'


export default function Clubs() {

  return (
     <ClubLayout>
        <div className="col flex-nowrap" >
          <div className={"outerbox d-flex mt-4 flex-md-column"}>
             <div className="StockIndicator d-flex flex-row justify-content-around" >
                  <Card className="card1" style={{backgroundColor: 'white' }}>
                      <Card.Body>
                          <Card.Title className="CardTitle d-flex justify-content-around">Vaccination </Card.Title>
                            <div className='card2'>
                            <h3 className=" d-flex justify-content-center">105</h3>
                            </div>
                           </Card.Body>
                       </Card>
                   
                 
                       <Card className="card1">
                           <Card.Body>
                               <Card.Title className="CardTitle">Blood Donation</Card.Title>
                               <div className='card2'>
                              <h3 className=" d-flex justify-content-center">055</h3>
                               </div>

                           </Card.Body>
                       </Card>         
                                
                </div>        
           </div>
        </div>
<div className='container text-center '>
  <div className='row mt-3 justify-content-center'>
     <Eventslider/>
    </div>
  </div>
    
  </ClubLayout>

  )
}
