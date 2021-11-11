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
import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import { Nav } from 'react-bootstrap';
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
    const searchMealList = [];
    // eslint-disable-next-line func-names
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body).meals;
      if (result == null) {
        setTest(true);
      } else {
        setTest(false);
        for (let i = 0; i < result.length; i++) {
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
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
