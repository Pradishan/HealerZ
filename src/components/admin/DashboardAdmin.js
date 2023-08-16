import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import Card from 'react-bootstrap/Card';
import './Admin.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default function DashboardAdmin() {
  const events = [
    { title: 'Meeting', start: new Date() }
  ]
  
  return (
    <AdminLayout>
      <div className="col flex-nowrap" >
          <div className={"outerbox d-flex mt-4 flex-md-column"}>
          
           <div className="StockIndicator d-flex flex-row justify-content-around" >
           
                   
                       <Card className="card1" style={{backgroundColor: 'white' }}>

                           <Card.Body>
                               <Card.Title className="CardTitle d-flex justify-content-around">Out Of Stocks </Card.Title>
                               <div className='card2'>
                                   
                                   <p className=" d-flex justify-content-center" style={{fontSize: '22px'}}>35</p>
                               </div>

                           </Card.Body>
                       </Card>
                   
                       <Card className="card1">

                           <Card.Body>
                               <Card.Title className="CardTitle"> low Stock</Card.Title>
                               <div className='card2'>
                                   
                                   <h3 className=" d-flex justify-content-center">20</h3>
                               </div>

                           </Card.Body>
                       </Card>
                   
                       <Card className="card1">
                           <Card.Body>
                               <Card.Title className="CardTitle">Expired Products</Card.Title>
                               <div className='card2'>
                                   
                                   <h3 className=" d-flex justify-content-center">05</h3>
                               </div>

                           </Card.Body>
                       </Card>
                       
                   
                   
                </div>
                

                  <div className="cal d-flex flex-row m-3 p-2">
                
                    
                    <FullCalendar
                      plugins={[dayGridPlugin]}
                      initialView='dayGridMonth'
                      weekends={true}
                      events={events}
                      eventContent={renderEventContent}
                    />
                  

                  </div>
                  
                
         
           </div>

           </div>
    </AdminLayout>
  )
}


