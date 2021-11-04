import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Container, Button, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

function Header() {
  const args = JSON.parse(document.getElementById('data').text);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
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
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
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
