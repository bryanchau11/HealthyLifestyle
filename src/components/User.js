/* eslint-disable no-loop-func */
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';

function Users() {
  const [error, setError] = useState('');
  const [data, setData] = useState({ username: '' });
  const args = JSON.parse(document.getElementById('data').text);
  const [mealSave, setMealSave] = useState(args.saved_meal);
  //const checkMealSaved = args.saved_meal;
  //if (checkMealSaved.lenth !== 0) setMealSave(checkMealSaved);

  let calculate_bmi = (data) => {
    if (data.weight && data.height) {
      let height = data.height;
      let weight = data.weight;
      let BMI = (weight / (height * height)) * 703;
      return BMI.toFixed(2);
    }
    return null
  };

  let calculate_bfp = (age, bmi, gender) => {
    if (age && bmi && gender) {
      if (gender === 'F') {
        return ((1.20 * bmi) + (0.23 * age)) - 5.4
      }
      if (gender === 'M') {
        return ((1.20 * bmi) + (0.23 * age)) - 16.2
      }
    }
    return null
  };

  useState(() => {
    const args = JSON.parse(document.getElementById('data').text);
    setData(args);
  }, []);

  const update = (e) => {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let height = document.getElementById('height').value;
    let weight = document.getElementById('weight').value;
    let password = document.getElementById('password').value;
    let age = document.getElementById('age').value;
    let gender = null
    let genderElements = document.getElementsByName("gender")
    genderElements.forEach((genderButton) => {
      if (genderButton.checked) {
        gender = genderButton.value
      }
    })
    let bmi = calculate_bmi({ height, weight });
    let bfp = calculate_bfp(age, bmi, gender);

    if (!username) {
      setError('Username cannot be empty.');
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
        calculate_bmi(result);
        alert('Profile Updated Successfully!');
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
    <>
      <div className="container">
        <div className="row">
          <div className="form-group mt-2 mb-1 col-4">
            <h4>Edit Profile</h4>
          </div>
          <br />
          <div className="col-8">
            <form>
              <div className="form-group mt-1">
                <label>
                  <b>Username</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Update username"
                  defaultValue={data.current_user}
                />
              </div>
              <div className="form-group mt-1">
                <label>
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Update Password"
                />
              </div>
              <div className="form-group mt-1">
                <label>
                  <b>Age</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  placeholder="Update Age"
                  min="0"
                  defaultValue={data.age}
                />
              </div>
              <div className="form-group mt-1">
                <label>
                  <b>Gender</b><br />
                  <input type="radio" value="M" name="gender" defaultChecked={data.gender === 'M' ? true : false} /> Male
                  <input type="radio" value="F" className="ml-1" name="gender" defaultChecked={data.gender === 'F' ? true : false} /> Female
                </label>
              </div>
              <div className="form-group mt-1">
                <label>
                  <b>Height</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="height"
                  placeholder="Update Height"
                  min="0"
                  defaultValue={data.height}
                />
                <small className="form-text text-muted">Height in inches</small>
              </div>
              <div className="form-group mt-1">
                <label>
                  <b>Weight</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  placeholder="Update Weight"
                  min="0"
                  defaultValue={data.weight}
                />
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
      <h1>Your saved meal below</h1>
      <div>
        <div className="container" {...bind()}>
          {mealSave ? mealSave.map((item) => (
            <div>
              <Nav.Link as={Link} to={`/recipe/${item.name}`}>
                {item.name}
              </Nav.Link>
              <animated.div
                key={item.name}
                className="card"
                style={{
                  ...style,
                  backgroundImage: `url(${item.image})`,
                }}
              ></animated.div>
              <Button variant="primary" type="button" onClick={() => deleteItem(item)}>
                X
              </Button>
            </div>
          )) : ''}
        </div>
      </div>
    </>
  );
}

export default Users;
