import React, { useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container, Button, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Header.css';
function Header() {
  const args = JSON.parse(document.getElementById('data').text);
  const textInput = useRef(null);
  const navigate = useNavigate();
  function onButtonClick() {
    navigate(`/search/${textInput.current.value}`);
    textInput.current.value = '';
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <div class="wrapper">
            <span>W</span>
            <span>E</span>
            <span>L</span>
            <span>C</span>
            <span>O</span>
            <span>M</span>
            <span>E</span>
          </div>
          <br />
          <Navbar.Brand>Welcome {args.current_user}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/index">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/users">
              Users
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
            <Form className="d-flex">
              <FormControl
                ref={textInput}
                type="text"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button onClick={onButtonClick} variant="outline-success">
                Search
              </Button>
            </Form>
          </Nav>
          <Form method="POST" action="/logout">
            <Button variant="outline-danger" type="submit">
              Logout
            </Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;
