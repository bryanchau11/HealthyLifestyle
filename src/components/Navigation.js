/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable semi */
/* eslint-disable array-callback-return */
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
import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Nav, Navbar, Container, Button, Form, FormControl, Alert, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Header.css';
import SearchIcon from '@mui/icons-material/Search';

const request = require('request');

function Header() {
  const args = JSON.parse(document.getElementById('data').text);
  const [show, setShow] = useState(false);
  const textInput = useRef(null);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [stateAreaList, setStateAreaList] = useState([]);
  const onButtonClick = (event) => {
    event.preventDefault();
    if (textInput.current.value == '') {
      setShow(true);
    } else {
      navigate(`/search/${textInput.current.value}`);
      textInput.current.value = '';
    }
  };
  const areaList = [];
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/list.php',
      qs: { a: 'list' },
      headers: {
        'x-rapidapi-host': 'themealdb.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
        useQueryString: true,
      },
    };

    // eslint-disable-next-line func-names
    request(options, function (error, response, body) {
      const result = JSON.parse(body).meals;
      for (let i = 0; i < result.length; i++) {
        areaList.push(result[i].strArea);
      }
      setStateAreaList(areaList);
    });
  }, []);

  console.log(stateAreaList);
  const obj = [];
  for (let i = 0; i < stateAreaList.length; i++) {
    obj.push(
      <Dropdown.Item as={Link} to={`/dropdown/${stateAreaList[i]}`}>
        {stateAreaList[i]}
      </Dropdown.Item>,
    );
  }
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
        <Container style={{ height: '23vh' }}>
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
          <Navbar.Brand className="font-nav-bar">Welcome {args.current_user}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="font-nav-bar" as={NavLink} to="/index">
              Home
            </Nav.Link>

            <Nav.Link className="font-nav-bar" as={NavLink} to="/users">
              Users
            </Nav.Link>

            <Nav.Link className="font-nav-bar" as={NavLink} to="/contact">
              Contact
            </Nav.Link>

            <Form className="d-flex" onSubmit={onButtonClick} endIcon={<SearchIcon color="success" fontSize="large" />}>
              <FormControl ref={textInput} type="text" placeholder="Search" className="me-2" aria-label="Search" />
              <Button className="font-nav-bar" onClick={onButtonClick} variant="outline-success">
                Search
              </Button>
            </Form>
          </Nav>
        </Container>
        <Dropdown>
          <Dropdown.Toggle className="font-nav-bar" variant="success" id="dropdown-basic">
            Area
          </Dropdown.Toggle>
          <Dropdown.Menu>{obj}</Dropdown.Menu>
        </Dropdown>
        <Form method="POST" action="/logout">
          <Button className="font-nav-bar" variant="outline-danger" type="submit">
            Logout
          </Button>
        </Form>
      </Navbar>
    </div>
  );
}
export default Header;
