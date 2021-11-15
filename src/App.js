/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
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
import './App.css';
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';

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
    const categoryObject = [];
    // eslint-disable-next-line func-names
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body).categories;
      for (let i = 0; i < result.length; i++) {
        // eslint-disable-next-line max-len
        categoryObject.push({ name: result[i].strCategory, image: result[i].strCategoryThumb, description: result[i].strCategoryDescription });
      }
      setCategory(categoryObject);
    });
  }, []);

  return (
    <>
      <div>
        <h1 className="font-curly">Pick your category</h1>

        <div className="containerv2" {...bind()}>
          {category.map((item) => (
            <div>
              <animated.div
                key={item.name}
                className="card"
                style={{
                  ...style,
                }}
              >
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body className="card-color">
                    <Card.Title style={{ color: 'wheat', fontSize: '30px' }}>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description.substring(0, 180)}{' '}
                      <OverlayTrigger
                        trigger="click"
                        placement="right"
                        overlay={
                          // eslint-disable-next-line react/jsx-wrap-multilines
                          <Popover id="popover-basic">
                            <Popover.Header as="h3">{item.name}</Popover.Header>
                            <Popover.Body>{item.description}</Popover.Body>
                          </Popover>
                        }
                      >
                        <Button variant="outline-info">Read more...</Button>
                      </OverlayTrigger>
                    </Card.Text>
                    <Button as={Link} to={`/category/${item.name}`} variant="primary">
                      Pick this category
                    </Button>
                  </Card.Body>
                </Card>
              </animated.div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <h1 className="font-curly">10 Random Meals</h1>
        <div className="containerv2" {...bind()}>
          {list.map((item) => (
            <div>
              <animated.div
                key={item.food}
                className="card"
                style={{
                  ...style,
                  backgroundImage: 'url(https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg)',
                }}
              >
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body className="card-color">
                    <Card.Title style={{ color: 'wheat', fontSize: '30px' }}>{item.food}</Card.Title>
                    <Card.Text>This {item.food} is very good</Card.Text>
                    <Button as={Link} to={`/recipe/${item.food}`} variant="primary">
                      Pick this meal
                    </Button>
                  </Card.Body>
                </Card>
              </animated.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
