import React from 'react';
import './Cadena.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

export function Cadena() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };

    
    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Ouvrir le cadenas
        </Button>
    
        <Modal className='text-center' show={show} onHide={handleClose} centered>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-auto">Cadenas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="validationCustomUsername">
                        <InputGroup className="mb-3" >
                            <Form.Control className='text-center' placeholder="*" required />
                            <Form.Control className='text-center' placeholder="*" required />
                            <Form.Control className='text-center' placeholder="*" required />
                            <Form.Control className='text-center' placeholder="*" required />
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", justifyContent: "center"}}>
                    <Button variant="primary" type="submit">Ouvrir</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
};