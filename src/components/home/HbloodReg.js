import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Home.css';

export default function HbloodReg() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='btn btn-primary regbutt' onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="">

              <Form.Label>Email:</Form.Label>
              <Form.Control
                className='forrminputt'
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
                className='forrminputt'
                type='text'
                placeholder='Name' />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="">
              <Form.Label>Nic No:</Form.Label>
              <Form.Control
                className='forrminputt'
                type='text'
                placeholder='99#######v' />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="">
              <Form.Label>Phone No:</Form.Label>
              <Form.Control
                className='forrminputt'
                type='text'
                placeholder='0767777777' />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                className='forrminputt'
                type='text'
                placeholder='Address' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button className='btn btn-primary' onClick={handleClose} style={{ backgroundColor: 'green',border:'none' }}>
            Register
          </Button>
          <Button className='btn btn-primary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

