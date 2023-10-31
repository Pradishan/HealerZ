import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./Clubs.css";


export default function CEReg(){
    
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Nic, setNic] = useState('');
  const [Phone_no, setPhone_no] = useState('');
  const [Address, setAddress] = useState('');
  const [Event, setEvent] = useState('');
    
  const resetForm = () => {
      setEmail('');
      setName('');
      setNic('');
      setPhone_no('');
      setAddress('');
      setEvent('');
        }


  const handleSubmit = () => {
    if (Email.length === 0) {
      toast.warning("Pls Enter the Email Address");
    }
     else if (Name.length === 0) {
        toast.warning("Pls Enter the Your Name");
    }
    else if (Nic.length === 0) {
        toast.warning("Pls Enter the Nic_no");
    }
    else if (Phone_no.length === 0) {
        toast.warning("Pls Enter the Phone_no");
    } 
    else if (Address.length === 0) {
        toast.warning("Pls Enter the Address");
    }
    else if(Event.length===0){
        toast.warning("pls Enter the Event Name");
        }

    else {
        const url = "http://localhost/HealerZ/PHP/club/Evtreg.php";
        let fdata = new FormData();
        fdata.append('email', Email);
        fdata.append('name', Name);
        fdata.append('nic', Nic);
        fdata.append('phone_no', Phone_no);
        fdata.append('address',Address);
        fdata.append('event', Event);
        axios.post(url, fdata)
            .then((response) => {
                console.log(response.data);
                //toast.success(response.data.message);
                if(response.data.message===true){
                    toast.success(response.data.message);
                    toast.success("Successfully added");
                    resetForm();
                }else{
                    toast.error("Try Again");
                }
                
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }
}

    return(
        <>
        <div style={{flexDirection:'row',padding:'10px',gap:'25px'}}>
      <div className="card card-2 cardproff" style={{width:750}}>
      <div className="">
              <div className="form-container">
                <h4 className="d-flex justify-content-center fw-bold">Event Registration</h4>
                <hr/>
                <Form id="medical-request-form">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name={"email"}
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="floatingPassword"
                      placeholder="Email"
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Email</label>
                  </div>
               
                  <div className="form-floating mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name={"name"}
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      id="floatingPassword"
                      placeholder="Name"
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Name</label>
                  </div>
                  
                  <div className="form-floating mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name={"nic"}
                      value={Nic}
                      onChange={(e) => setNic(e.target.value)}
                      id="floatingPassword"
                      placeholder="Nic NO"
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">NIC No</label>
                  </div>
                 
                  <div className="form-floating mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name={"phone_no"}
                      value={Phone_no}
                      onChange={(e) => setPhone_no(e.target.value)}
                      id="floatingPassword"
                      placeholder="Phone No"
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Phone_no</label>
                  </div>
                 
                  <div className="form-floating mt-3">
                    <input
                      type="text"
                      name={"address"}
                      value={Address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Address"
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Address</label>
                  </div>
                
                  <div className="form-floating mt-3" > 
                  <select
                                    name={'event'}
                                    className="form-control"
                                    onChange={(e) => setEvent(e.target.value)}
                                    value={Event}
                   >
                                    <option value={''}>Select Category</option>
                                    <option value={'vaccination'}>Vaccination</option>
                                    <option value={'blooddonation'}>Blood Donation</option>
                     </select>

                  </div>
                            

           <div className='justify-content-end'>     
                 
          <Button className='btn btn-primary mt-3 m-1'name={"send"} value={"Send"} onClick={handleSubmit} style={{ backgroundColor: 'green',border:'none' }}>
            Register
          </Button>
          
          <Button className='btn btn-primary m-1' onClick={resetForm}>
            Reset
          </Button>
          </div>  
          <ToastContainer/>
          </Form>
            </div>
            </div>
            </div>
            </div>
        </>
    )
}