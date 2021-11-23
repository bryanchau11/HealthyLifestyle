/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable func-names */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-alert */
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

import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';
import nutriBackGround from './nutrition.jpg';

const request = require('request');

function Nutrition() {
  const { ingredientName } = useParams();
  const [nutritionList, setList] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
      qs: { query: `${ingredientName}` },
      headers: {
        'x-rapidapi-host': 'calorieninjas.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
        useQueryString: true,
      },
    };
    const ingredientArray = [];

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body).items[0];

      let key = '';
      for (key in result) {
        if (key != 'name' && key != 'serving_size_g')
          ingredientArray.push({
            name: key,
            unit: result[key],
          });
      }
      setList(ingredientArray);
    });
  }, []);
  const recipeBackground = {
    backgroundImage: `url(${nutriBackGround})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: '#ffffff',
    border: '20px solid transparent',
    padding: '15px',
    borderImage: 'url(https://images.unsplash.com/photo-1597113366853-fea190b6cd82?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80) 30 stretch',
  };
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
      qs: { i: `${ingredientName}` },
      headers: {
        'x-rapidapi-host': 'themealdb.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
        useQueryString: true,
      },
    };
    const categoryMeal = [];
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      const result = JSON.parse(body).meals;
      for (let i = 0; i < result.length; i++) {
        categoryMeal.push({ name: result[i].strMeal, image: result[i].strMealThumb });
      }
      setCategory(categoryMeal);
    });
  }, []);
  return (
    <div>
      <Container>
        <Row style={recipeBackground}>
          <Col>
            <h1 style={{ fontSize: '40px' }} className="font-noticia">
              {ingredientName}'s Nutrition Fact per serving size of 100g
            </h1>
            <img src={`https://www.themealdb.com/images/ingredients/${ingredientName}.png`} alt="x" width={500} height={500} />
          </Col>
          <Col>
            <ul className="font-noticia">
              {nutritionList.map((item) => (
                <li>
                  {item.name} : <span style={{ color: '#1AFF00' }}> {item.unit}</span>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
      <h1 style={{ fontSize: '40px' }} className="font-noticia">
        {' '}
        Meal by {ingredientName}
      </h1>
      <div>
        <div className="containerv2" {...bind()}>
          {category.map((item) => (
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

export default Nutrition;
