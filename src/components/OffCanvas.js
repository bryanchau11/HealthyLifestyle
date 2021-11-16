/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import '../App.css';

function OffCanvas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="font-nav-bar" variant="success" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Ingredient</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>Pick your ingredient</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;
