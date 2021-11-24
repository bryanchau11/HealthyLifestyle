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
          position: 'top-end',
          icon: 'success',
          title: 'Profile Updated Successfully!',
          showConfirmButton: false,
          timer: 1500,
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
          <div className="container" style={{ color: 'wheat' }}>
            <div className="row">
              <div className="form-group mt-2 mb-1 col-4">
                <h4 className="font-curly">Edit Profile</h4>
              </div>
              <br />
              <div className="col-8">
                <form>
                  <div className="form-group mt-1">
                    <label>
                      <b>username</b>
                    </label>
                    <input type="text" className="form-control" id="username" placeholder="Update username" defaultValue={data.current_user} />
                  </div>
                  <div className="form-group mt-1">
                    <label>
                      <b>Password</b>
                    </label>
                    <input type="password" className="form-control" id="password" placeholder="Update Password" />
                  </div>
                  <div className="form-group mt-1">
                    <label>
                      <b>Age</b>
                    </label>
                    <input type="number" className="form-control" id="age" placeholder="Update Age" min="0" defaultValue={data.age} />
                  </div>
                  <div className="form-group mt-1">
                    <label>
                      <b>Gender</b>
                      <br />
                      <input type="radio" value="M" name="gender" defaultChecked={data.gender === 'M'} /> Male
                      <input type="radio" value="F" className="ml-1" name="gender" defaultChecked={data.gender === 'F'} /> Female
                    </label>
                  </div>
                  <div className="form-group mt-1">
                    <label>
                      <b>Height</b>
                    </label>
                    <input type="number" className="form-control" id="height" placeholder="Update Height" min="0" defaultValue={data.height} />
                    <small className="form-text text-muted">Height in inches</small>
                  </div>
                  <div className="form-group mt-1">
                    <label>
                      <b>Weight</b>
                    </label>
                    <input type="number" className="form-control" id="weight" placeholder="Update Weight" min="0" defaultValue={data.weight} />
                    <small className="form-text text-muted">Weight in pounds</small>
                  </div>
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
                  <button type="button" className="btn btn-primary mt-1" onClick={(e) => update(e)}>
                    Update
                  </button>
                </form>
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
