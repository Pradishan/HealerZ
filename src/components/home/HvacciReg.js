import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import './Home.css';

export default function HvacciReg() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Nic, setNic] = useState('');
  const [Phone_no, setPhone_no] = useState('');
  const [Address, setAddress] = useState('');
  const [Vaccine_name, SetVaccine_name] = useState('');

  
  const resetForm = () => {
      setEmail('');
      setName('');
      setNic('');
      setPhone_no('');
      setAddress('');
      SetVaccine_name('');
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
     else if(Vaccine_name.length===0){
        toast.warning("pls Enter the Vaccination Name")
        }
    
    else {
        const url = "http://localhost/HealerZ/PHP/";
        let fdata = new FormData();
        fdata.append('email', Email);
        fdata.append('name', Name);
        fdata.append('nic', Nic);
        fdata.append('phone_no', Phone_no);
        fdata.append('address',Address);
        fdata.append('vaccine_name', Vaccine_name)

        axios.post(url, fdata)
            .then((response) => {
                console.log(response.data);
                //toast.success(response.data.message);
                if(response.data.message==="Successfully registered"){
                    toast.success(response.data.message);
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

  return (
    <>
      <Button className='btn btn-primary regbutt' onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vaccination Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
              <div className="form-container">
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
                  <br />
                  <div className="form-floating">
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
                  <br />
                  <div className="form-floating">
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
                  <br />
                  <div className="form-floating">
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
                  <br />
                  <div className="form-floating">
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
                  <br />

                  <br />
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name={"vaccine_name"}
                      value={Vaccine_name}
                      onChange={(e) => SetVaccine_name(e.target.value)}
                      id="floatingPassword"
                      placeholder="Blood group"
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Vaccine_name</label>
                  </div>
                  <br />
                 
                </Form>
              
            </div>

        </Modal.Body>
        <Modal.Footer>

          <Button className='btn btn-primary'name={"send"} value={"Send"} onClick={handleSubmit} style={{ backgroundColor: 'green',border:'none' }}>
            Register
          </Button>
          <ToastContainer/>
          <Button className='btn btn-secondary' onClick={resetForm}>
            Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}