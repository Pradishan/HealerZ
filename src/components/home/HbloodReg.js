import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function HbloodReg() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='btn bg-outline-white'  onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Blood Donation Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="">

              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Name@example.com"
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="">
              <Form.Label>Name:</Form.Label>
              <Form.Control 
              type='text'
              placeholder='Name'/>
              </Form.Group>

              <Form.Group
              className="mb-3"
              controlId="">
              <Form.Label>Nic No:</Form.Label>
              <Form.Control 
              type='text'
              placeholder='99#######v'/>
             </Form.Group>

             <Form.Group
              className="mb-3"
              controlId="">
              <Form.Label>Name:</Form.Label>
              <Form.Control 
              type='text'
              placeholder='0767777777'/>
            </Form.Group>

              <Form.Group
              className="mb-3"
              controlId="">
              <Form.Label>Phone no:</Form.Label>
              <Form.Control 
              type='text'
              placeholder='Address'/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn d-md-block text-white my-3 btn-gr'  onClick={handleClose}>
            Close
          </Button>
          <Button className='btn d-md-block text-white my-3 btn-gr'   onClick={handleClose}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

