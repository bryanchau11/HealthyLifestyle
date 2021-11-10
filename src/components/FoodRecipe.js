/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { React, useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { Button, Nav } from 'react-bootstrap';
import YoutubeEmbed from './YoutubeEmbed';
import 'bootstrap/dist/css/bootstrap.css';
import { Rating, RatingView } from 'react-simple-star-rating';
import { Divider, Avatar, Grid, Paper } from '@material-ui/core';
import { Box, TextField, useFormControl } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Form, FormControl, Alert, FloatingLabel } from 'react-bootstrap';
const request = require('request');
function RecipeDetail() {
  const args = JSON.parse(document.getElementById('data').text);
  const userName = args.current_user;
  const userEmail = args.current_user_email;
  const { foodName } = useParams();
  const [instruction, setInstruction] = useState();
  const [mealImage, setImage] = useState();
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState();
  function YouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
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

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let result = JSON.parse(body).meals[0];
      setInstruction(result.strInstructions);
      setImage(result.strMealThumb);
      var ingredientArray = [];
      var key = '';
      for (key in result) {
        if (key.startsWith('strIngredient')) {
          if (result[key] != '' && result[key] != null) ingredientArray.push(result[key]);
        }
      }
      //setIngredient(ingredientArray);
      var measureArray = [];
      for (key in result) {
        if (key.startsWith('strMeasure')) {
          if (result[key] != '' && result[key] != null) measureArray.push(result[key]);
        }
      }
      //setMeasure(measureArray);
      var ingredientAndMeasureResult = [];
      for (var i = 0; i < ingredientArray.length; i++) {
        ingredientAndMeasureResult.push({
          ingre: ingredientArray[i],
          meas: measureArray[i],
        });
      }
      var videoLink = YouTubeGetID(result.strYoutube);
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
  const imgLink =
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*';
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
  //  Get all comments for a specific food
  const [commentThread, setCommentThread] = useState([]);

  useEffect(() => {
    var commentThreadList = [];
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
        //var item = '';
        for (var i = 0; i < data.comment.length; i++) {
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
    var commentThreadList = [...commentThread];
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
      <h1>
        AVERAGE RATING: <Rating ratingValue={avgRating} /> <br />
        {foodName}{' '}
        <Button onClick={saveMeal} variant={color}>
          {text}
        </Button>
        <Rating onClick={handleRating} ratingValue={rating} /* Rating Props */ />
      </h1>
      <img className="fixed_img" src={mealImage} alt="food pictures" />
      <h2>Ingredient</h2>
      <ul>
        {ingredientAndMeasure.map((item) => (
          <li>
            <Button
              style={{ color: 'black' }}
              as={Link}
              to={`/nutrition/${item.ingre}`}
              variant="outline-info"
            >
              {item.ingre} : {item.meas}
            </Button>
          </li>
        ))}
      </ul>
      <br />
      <h2>Instruction</h2>
      <div>{instruction}</div>
      <YoutubeEmbed embedId={youtubeLink} />
      <Paper style={{ padding: '40px 20px', backgroundColor: 'rgb(228, 214, 196)' }}>
        {commentThread.map((item) => (
          <Comment username={item.username} comment={item.comment} email={item.email} />
        ))}

        {/*<Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="text"
            ref="myField"
            id="outlined-basic"
            label="Type your comment"
            variant="outlined"
          />
          <Button variant="contained" endIcon={<AddCommentIcon />} onClick={saveComment}>
            Comment
          </Button>
        </Box>*/}
        <Form className="d-flex" onSubmit={saveComment}>
          <FormControl
            ref={textInput}
            type="text"
            className="me-2"
            placeholder="Type your comment"
            aria-label="Search"
          />
          <Button onClick={saveComment} variant="outline-success">
            Save Comment
          </Button>
        </Form>
      </Paper>
    </div>
  );
}

export default RecipeDetail;
