/* eslint-disable eqeqeq */
import logo from './logo.svg';
import './App.css';
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';
import Category from './components/Category';
const request = require('request');
function App() {
  const args = JSON.parse(document.getElementById('data').text);
  const list = args.list_of_item;
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
      url: 'https://themealdb.p.rapidapi.com/categories.php',
      headers: {
        'x-rapidapi-host': 'themealdb.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
        useQueryString: true,
      },
    };
    var categoryObject = [];
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let result = JSON.parse(body).categories;
      for (var i = 0; i < result.length; i++) {
        categoryObject.push({ name: result[i].strCategory, image: result[i].strCategoryThumb });
      }
      setCategory(categoryObject);
    });
  }, []);
  return (
    <>
      <div>
        <h1>Pick your category</h1>
        <div className="container" {...bind()}>
          {category.map((item) => (
            <Nav.Link as={Link} to={`/category/${item.name}`}>
              <animated.div
                key={item.name}
                className="card"
                style={{
                  ...style,
                  backgroundImage: `url(${item.image})`,
                }}
              >
                {item.name}
              </animated.div>
            </Nav.Link>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        <h1>10 Random Meals</h1>
        <div className="container" {...bind()}>
          {list.map((item) => (
            <Nav.Link as={Link} to={`/recipe/${item.food}`}>
              <animated.div
                key={item.food}
                className="card"
                style={{
                  ...style,
                  backgroundImage: `url(${item.image})`,
                }}
              >
                {item.food}
              </animated.div>
            </Nav.Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
