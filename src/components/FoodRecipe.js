/* eslint-disable array-callback-return */
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
import { React, useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
// eslint-disable-next-line object-curly-newline
import { Button, Form, FormControl, Figure, Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import { Rating } from 'react-simple-star-rating';
import { Avatar, Grid, Paper } from '@material-ui/core';
import YoutubeEmbed from './YoutubeEmbed';

const request = require('request');

const imgLink = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*';
function Comment(prop) {
  return (
    <Grid container wrap="nowrap" spacing={2} style={{ backgroundColor: 'rgb(236, 226, 212)' }}>
      <Grid item>
        <Avatar alt="Remy Sharp" src={imgLink} />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: 'left' }}>
          {prop.username} : {prop.email}
        </h4>
        <p style={{ textAlign: 'left' }}>{prop.comment}</p>
        <p style={{ textAlign: 'left', color: 'gray' }}>posted 1 minute ago</p>
      </Grid>
    </Grid>
  );
}
function RecipeDetail() {
  const args = JSON.parse(document.getElementById('data').text);
  const userName = args.current_user;
  const userEmail = args.current_user_email;
  const { foodName } = useParams();
  const [instruction, setInstruction] = useState([]);
  const [mealImage, setImage] = useState();
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState();
  function YouTubeGetID(url) {
    let ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      // eslint-disable-next-line no-useless-escape
      ID = url[2].split(/[^0-9a-z_\-]/i);
      // eslint-disable-next-line prefer-destructuring
      ID = ID[0];
    } else {
      ID = url;
    }
    return ID;
  }

  // Getting list of ingredient for specific food
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/search.php',
      qs: { s: `${foodName}` },
      headers: {
        'x-rapidapi-host': 'themealdb.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
        useQueryString: true,
      },
    };

    // eslint-disable-next-line func-names
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body).meals[0];
      // eslint-disable-next-line no-useless-escape
      const res = result.strInstructions.split('.');

      setInstruction(res);
      setImage(result.strMealThumb);
      const ingredientArray = [];
      let key = '';
      for (key in result) {
        if (key.startsWith('strIngredient')) {
          if (result[key] != '' && result[key] != null) ingredientArray.push(result[key]);
        }
      }
      const measureArray = [];
      for (key in result) {
        if (key.startsWith('strMeasure')) {
          if (result[key] != '' && result[key] != null) measureArray.push(result[key]);
        }
      }
      const ingredientAndMeasureResult = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < ingredientArray.length; i++) {
        ingredientAndMeasureResult.push({
          ingre: ingredientArray[i],
          meas: measureArray[i],
        });
      }
      const videoLink = YouTubeGetID(result.strYoutube);
      setYoutubeLink(videoLink);
      setIngredientAndMeasure(ingredientAndMeasureResult);
    });
  }, []);
  const [color, setColor] = useState('primary');
  const [text, setText] = useState('Save Meal');
  function saveMeal() {
    const requestData = { save_meal: foodName };
    fetch('/save_meal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setColor(data.color);
        setText(data.text);
      });
  }
  // Rating meal
  const [rating, setRating] = useState(0); // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    // Some logic
    const requestData = { userRating: rate, food: foodName };
    fetch('/user_rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
  };
  const [avgRating, setAvgRating] = useState();
  useEffect(() => {
    // eslint-disable-next-line object-shorthand
    const requestData = { foodName: foodName };
    fetch('/get_average_rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setAvgRating(data.rating);
      });
  }, [rating]);
  // eslint-disable-next-line operator-linebreak

  //  Get all comments for a specific food
  const [commentThread, setCommentThread] = useState([]);

  useEffect(() => {
    const commentThreadList = [];
    // eslint-disable-next-line object-shorthand
    const requestData = { foodName: foodName };
    fetch('/get_comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.comment);
        console.log(typeof data.comment);
        for (let i = 0; i < data.comment.length; i++) {
          commentThreadList.push({
            email: data.comment[i][0],
            username: data.comment[i][1],
            comment: data.comment[i][2],
          });
        }
        setCommentThread(commentThreadList);
      });

    console.log(commentThread);
  }, []);
  const textInput = useRef(null);
  const saveComment = (event) => {
    event.preventDefault();
    const commentThreadList = [...commentThread];
    commentThreadList.push({
      email: userEmail,
      username: userName,
      comment: textInput.current.value,
    });
    setCommentThread(commentThreadList);
    console.log({ email: userEmail, username: userName, comment: textInput.current.value });
    const requestData = {
      email: userEmail,
      username: userName,
      comment: textInput.current.value,
      food: foodName,
    };

    fetch('/save_comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    textInput.current.value = '';
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1>
              {foodName} <br />
              <Button onClick={saveMeal} variant={color}>
                {text}
              </Button>
              <Rating onClick={handleRating} ratingValue={rating} /* Rating Props */ /> <br />
            </h1>
            <h3>
              AVERAGE RATING: <Rating ratingValue={avgRating} />
            </h3>
          </Col>
          <Col>
            <Figure>
              <Figure.Image width={400} height={600} alt="food pictures" src={mealImage} />
            </Figure>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col style={{ backgroundColor: 'burlywood' }}>
            <h2>Ingredient</h2>
            <ul>
              {ingredientAndMeasure.map((item) => (
                <li>
                  <Button style={{ color: 'black' }} as={Link} to={`/nutrition/${item.ingre}`} variant="outline-info">
                    {item.ingre} : {item.meas}
                  </Button>
                </li>
              ))}
            </ul>
            <br />
          </Col>
          <Col>
            <h2>Instruction</h2>
            <ol>
              {instruction.map((item) => (
                <li>{item}</li>
              ))}
            </ol>
          </Col>
        </Row>
      </Container>

      <YoutubeEmbed embedId={youtubeLink} />

      <Paper style={{ padding: '40px 20px', backgroundColor: 'rgb(228, 214, 196)' }}>
        {commentThread.map((item) => (
          <Comment username={item.username} comment={item.comment} email={item.email} />
        ))}
        <Form className="d-flex" onSubmit={saveComment}>
          <FormControl ref={textInput} type="text" className="me-2" placeholder="Type your comment" aria-label="Search" />
          <Button onClick={saveComment} variant="outline-success">
            Save Comment
          </Button>
        </Form>
      </Paper>
    </div>
  );
}

export default RecipeDetail;
