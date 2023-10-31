import React from 'react';
import ClubLayout from '../../layouts/ClubLayout';
import Card from 'react-bootstrap/Card';
import Eventslider from './Eventslider';
import FeatherIcon from 'feather-icons-react';
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
                            <div className='card2 d-flex justify-content-center mt-3'>
                            <FeatherIcon icon="thermometer" />
                              </div>
                            <h3 className="d-flex justify-content-center mt-2">105</h3>
                           </Card.Body>
                       </Card>
                   
                 
                       <Card className="card1">
                           <Card.Body>
                               <Card.Title className="CardTitle">Blood Donation</Card.Title>
                               <div className='card2  d-flex justify-content-center mt-3'>
                               <FeatherIcon icon="activity" />
                               </div>
                               <h3 className="d-flex justify-content-center mt-2">055</h3>
                           </Card.Body>
                       </Card>         
                                
                </div>        
           </div>
        </div>

        <div className="col d-flex justify-content-center" >
        <Eventslider/>
        </div>
    
     </ClubLayout>

  )
}
