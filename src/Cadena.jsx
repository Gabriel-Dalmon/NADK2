import React from 'react';
import './Cadena.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import {Howl, Howler} from 'howler';

export function Cadena() {
    Howler.volume(0.5);
    
    var sound = new Howl({
        src: ['lockedSound.mp3']
      });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        let firstCodeNumber = document.getElementById("firstCodeNumber").value;
        let secondCodeNumber = document.getElementById("secondCodeNumber").value;
        let thirdCodeNumber = document.getElementById("thirdCodeNumber").value;
        let fourthCodeNumber = document.getElementById("fourthCodeNumber").value;

        if (!firstCodeNumber) {firstCodeNumber =  0}
        if (!secondCodeNumber) {secondCodeNumber = 0}
        if (!thirdCodeNumber) {thirdCodeNumber = 0}
        if (!fourthCodeNumber) {fourthCodeNumber = 0}

        console.log(firstCodeNumber, secondCodeNumber, thirdCodeNumber, fourthCodeNumber);

        if (firstCodeNumber === "1" && secondCodeNumber === "1" && thirdCodeNumber === "1" && fourthCodeNumber === "1") {
            console.log("ouvert");
            handleClose();
        }
        else {
            console.log("fermé");
            sound.play();
            document.getElementById("locked").innerHTML = "Rien ne se passe..."; 
        }

        form.checkValidity()
        event.preventDefault();
        event.stopPropagation();
    };

    
    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Ouvrir le cadenas
        </Button>
    
        <Modal className='text-center' show={show} onHide={handleClose} centered>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-auto">Cadenas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <InputGroup className="mb-3" >
                            <Form.Control className='text-center' id='firstCodeNumber' maxLength={1} pattern='\d{1,1}' name='codeNumber' placeholder="*" required />
                            <Form.Control className='text-center' id='secondCodeNumber' maxLength={1} pattern='\d{1,1}' name='codeNumber' placeholder="*" required />
                            <Form.Control className='text-center' id='thirdCodeNumber' maxLength={1} pattern='\d{1,1}' name='codeNumber' placeholder="*" required />
                            <Form.Control className='text-center' id='fourthCodeNumber' maxLength={1} pattern='\d{1,1}' name='codeNumber' placeholder="*" required />
                        </InputGroup>
                        <div id='locked'></div>
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