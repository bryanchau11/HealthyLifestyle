/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable
react/no-array-index-key,
react-hooks/exhaustive-deps,
react/jsx-filename-extension,
quote-props,
*/
import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';

const request = require('request');

function AreaAndIngredient() {
  const { result } = useParams();
  const [area, setArea] = useState([]);
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
      qs: { a: result },
      headers: {
        'x-rapidapi-host': 'themealdb.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
        useQueryString: true,
      },
    };
    const areaMeal = [];
    request(options, (error, response, body) => {
      if (error) {
        throw new Error(error);
      }
      const areaResult = JSON.parse(body).meals;
      for (let i = 0; i < areaResult.length; i++) {
        areaMeal.push({ name: areaResult[i].strMeal, image: areaResult[i].strMealThumb });
      }
      setArea(areaMeal);
    });
  }, [result]);

  return (
    <div>
      <h1 className="font-curly">{result}</h1>
      <div>
        <div className="containerv2" {...bind()}>
          {area.map((item) => (
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
                  </Card.Body>
                </Card>
              </animated.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AreaAndIngredient;
