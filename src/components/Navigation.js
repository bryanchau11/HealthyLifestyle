import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
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
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;
