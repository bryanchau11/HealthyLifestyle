/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-loop-func */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable curly */
/* eslint-disable eqeqeq */
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
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Card, Button, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';
import { calculateBmi, calculateBfp } from './Calculate';

const Swal = require('sweetalert2');

function Users() {
  const [error, setError] = useState('');
  const [data, setData] = useState({ username: '' });
  const args = JSON.parse(document.getElementById('data').text);
  const [mealSave, setMealSave] = useState(args.saved_meal);

  useState(() => {
    setData(args);
  }, []);

  const update = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;
    let gender = null;
    const genderElements = document.getElementsByName('gender');
    genderElements.forEach((genderButton) => {
      if (genderButton.checked) {
        gender = genderButton.value;
      }
    });
    const bmi = calculateBmi({ height, weight });
    const bfp = calculateBfp(age, bmi, gender);

    if (!username) {
      setError('username cannot be empty.');
      return;
    }
    setError('');

    fetch('/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, height, weight, bmi, bfp, age, gender }),
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        calculateBmi(result);
        // alert('Profile Updated Successfully!');
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated Successfully!',
          showConfirmButton: false,
          timer: 1800,
        });
      })
      .catch((err) => {
        console.error('Request failed', err);
        setError(err.message);
      });
  };

  const [style, set] = useSpring(() => ({
    transform: 'perspective(300px) rotateY(0deg)',
  }));

  const bind = useScroll((event) => {
    set({
      transform: `perspective(500px) rotateY(${event.scrolling ? event.delta[0] : 0}deg)`,
    });
  });
  function deleteItem(idDelete) {
    const newarray = mealSave.filter((element) => element !== idDelete);
    console.log(idDelete.name);
    setMealSave(newarray);
    fetch('/delete_meal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ delete_meal: idDelete.name }),
    });
  }
  return (
    <div>
      <Container>
        <Row>
          <div className="shade">
            <div className="blackboard">
              <div className="form">
                <p>
                  <label>Username: </label>
                  <input type="text" id="username" placeholder="Update username" defaultValue={data.current_user} />
                </p>
                <p>
                  <label>Password: </label>
                  <input type="password" id="password" placeholder="Update Password" />
                </p>
                <p>
                  <label>Age: </label>
                  <input type="number" id="age" placeholder="Update Age" min="0" defaultValue={data.age} />
                </p>
                <p>
                  <label>Gender: </label> <br />
                  <input type="radio" value="M" name="gender" defaultChecked={data.gender === 'M'} /> <span style={{ color: 'rgba(238, 238, 238, 0.7)' }}> Male </span>
                  <input type="radio" value="F" name="gender" defaultChecked={data.gender === 'F'} />
                  <span style={{ color: 'rgba(238, 238, 238, 0.7)' }}> Female </span>
                </p>
                <p>
                  <label>Height: </label>

                  <input type="number" id="height" placeholder="Update Height" min="0" defaultValue={data.height} />
                  <br />
                  <small className="form-text text-muted">Height in inches</small>
                </p>
                <p>
                  <label>Weight: </label>
                  <input type="number" id="weight" placeholder="Update Weight" min="0" defaultValue={data.weight} /> <br />
                  <small className="form-text text-muted">Weight in pounds</small>
                </p>
                <p>
                  <div className="form-group mt-1">
                    <label>
                      <b>Calculated Values</b>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <b>BMI{' : '}</b>
                    </label>
                    <label>{data.bmi ? data.bmi : 'N/A'}</label>
                  </div>
                  <div className="form-group mt-1">
                    <label>
                      <b>Body Fat Percentage{' : '}</b>
                    </label>
                    <label>{data.bfp ? data.bfp : 'N/A'}</label>
                  </div>
                  <div className="form-group mt-1">
                    <small className="form-text text-danger">{error}</small>
                  </div>
                </p>
                <p className="wipeout">
                  <button type="button" className="btn btn-primary mt-1" onClick={(e) => update(e)}>
                    Update
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Row>
      </Container>
      <h1 className="font-curly">Your saved meal below</h1>
      <div>
        <div className="containerv2" {...bind()}>
          {mealSave
            ? mealSave.map((item) => (
                // eslint-disable-next-line react/jsx-indent
                <div>
                  <animated.div
                    key={item.name}
                    className="card"
                    style={{
                      ...style,
                      backgroundImage: 'url(https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg)',
                    }}
                  >
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={item.image} />
                      <Card.Body className="card-color">
                        <Card.Title style={{ color: 'wheat', fontSize: '30px' }}>{item.name}</Card.Title>
                        <Card.Text>This {item.name} is very good</Card.Text>
                        <Button as={Link} to={`/recipe/${item.name}`} variant="primary">
                          Pick this meal
                        </Button>
                        <Button variant="danger" type="button" onClick={() => deleteItem(item)}>
                          X
                        </Button>
                      </Card.Body>
                    </Card>
                  </animated.div>
                </div>
                // eslint-disable-next-line indent
              ))
            : ''}
        </div>
      </div>
    </div>
  );
}

export default Users;
