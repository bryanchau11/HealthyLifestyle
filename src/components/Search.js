/* eslint-disable no-loop-func */
import { React, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import { Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';
import NotFoundPage from '../pages/NotFound';
const request = require('request');
function Search() {
  const { searchMeal } = useParams();
  const [test, setTest] = useState(false);
  const [mealList, setMealList] = useState([]);
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
      qs: { s: searchMeal },
      headers: {
        'x-rapidapi-host': 'themealdb.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
        useQueryString: true,
      },
    };
    var searchMealList = [];
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let result = JSON.parse(body).meals;
      if (result == null) {
        setTest(true);
      } else {
        setTest(false);
        for (var i = 0; i < result.length; i++) {
          searchMealList.push({ name: result[i].strMeal, image: result[i].strMealThumb });
        }
      }
      setMealList(searchMealList);
    });
  }, [searchMeal]);
  if (test) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <h1>{searchMeal}</h1>
      <div>
        <div className="container" {...bind()}>
          {mealList.map((item) => (
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
