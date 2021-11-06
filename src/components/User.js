import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';
const request = require('request');
function Users() {
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState({ username: '' });

  let calculate_bmi = (data) => {
    if (data.weight && data.height) {
      let height = data.height;
      let weight = data.weight;
      let BMI = (weight / (height * height)) * 703;
      return BMI.toFixed(2);
    }
  };

  React.useState(() => {
    const args = document.getElementById('data').text
      ? JSON.parse(document.getElementById('data').text)
      : '';
    setData(args);
    calculate_bmi(args);
  }, []);

  const update = (e) => {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let height = document.getElementById('height').value;
    let weight = document.getElementById('weight').value;
    let password = document.getElementById('password').value;
    let bmi = calculate_bmi({ height, weight });
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
      body: JSON.stringify({ username, password, height, weight, bmi }),
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
  // Display saved meal for current user
  const [category, setCategory] = useState([]);
  const [style, set] = useSpring(() => ({
    transform: 'perspective(300px) rotateY(0deg)',
  }));

  const bind = useScroll((event) => {
    set({
      transform: `perspective(500px) rotateY(${event.scrolling ? event.delta[0] : 0}deg)`,
    });
  });
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/search.php',
      qs: { s: 'Arrabiata' },
      headers: {
        'x-rapidapi-host': 'themealdb.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
        useQueryString: true,
      },
    };
    var saveMeal = [];
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let result = JSON.parse(body).meals;
      for (var i = 0; i < result.length; i++) {
        saveMeal.push({ name: result[i].strMeal, image: result[i].strMealThumb });
      }
      setCategory(saveMeal);
    });
  }, []);
  return (
    <div className="container">
      <div className="form-group mt-2 mb-1">
        <h4>Edit Profile</h4>
      </div>
      <div className="col-6">
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
              <b>Calculated BMI{' : '}</b>
            </label>
            <label>{data.bmi ? data.bmi : 'N/A'}</label>
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
  );
}

export default Users;
