/* eslint-disable object-curly-newline */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-param-reassign */
/* eslint-disable react/function-component-definition */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable
react/no-array-index-key,
react-hooks/exhaustive-deps,
react/jsx-filename-extension,
quote-props,
*/
// eslint-disable-next-line object-curly-newline
import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container, Button, Form, FormControl, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Header.css';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  const args = JSON.parse(document.getElementById('data').text);
  const [show, setShow] = useState(false);
  const textInput = useRef(null);
  const navigate = useNavigate();
  const onButtonClick = (event) => {
    event.preventDefault();
    if (textInput.current.value == '') {
      setShow(true);
    } else {
      navigate(`/search/${textInput.current.value}`);
      textInput.current.value = '';
    }
  };
  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! Your input is null !</Alert.Heading>
        Please enter something...
      </Alert>
    );
  }
  return (
    <div>
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

            <Form className="d-flex" onSubmit={onButtonClick} endIcon={<SearchIcon color="success" fontSize="large" />}>
              <FormControl ref={textInput} type="text" placeholder="Search" className="me-2" aria-label="Search" />
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
    </div>
  );
}
export default Header;
