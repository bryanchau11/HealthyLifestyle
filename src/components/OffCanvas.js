/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import ChatBot from 'react-simple-chatbot';
import '../App.css';

function OffCanvas() {
  const [show, setShow] = useState(false);
  const args = JSON.parse(document.getElementById('data').text);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const navigate = useNavigate();

  return (
    <>
      <Button className="font-nav-bar" variant="success" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Welcome to our ChatBot</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ChatBot
            headerTitle="Waifu Bot"
            recognitionEnable="true"
            steps={[
              {
                id: 'greeting-user',
                message: `Hello ${args.current_user}`,
                trigger: '2',
              },
              {
                id: '2',
                message: 'What would you like to eat?',
                trigger: '3',
              },
              {
                id: '3',
                user: true,
                trigger: '4',
              },
              {
                id: '4',
                message: 'Yeah, who cares, bye!',
                end: true,
              },
            ]}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;
