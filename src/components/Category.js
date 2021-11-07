import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';
const request = require('request');
function Category() {
  const { categoryName } = useParams();
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
      url: 'https://themealdb.p.rapidapi.com/filter.php',
      qs: { c: categoryName },
      headers: {
        'x-rapidapi-host': 'themealdb.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
        useQueryString: true,
      },
    };
    var categoryMeal = [];
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let result = JSON.parse(body).meals;
      for (var i = 0; i < result.length; i++) {
        categoryMeal.push({ name: result[i].strMeal, image: result[i].strMealThumb });
      }
      setCategory(categoryMeal);
    });
  }, []);

  return (
    <div>
      <h1>{categoryName}</h1>
      <div>
        <div className="container" {...bind()}>
          {category.map((item) => (
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
              >
                 
              </animated.div>
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
