/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { Button, Nav } from 'react-bootstrap';
import YoutubeEmbed from './YoutubeEmbed';
import 'bootstrap/dist/css/bootstrap.css';
import { Rating, RatingView } from 'react-simple-star-rating';
import { Divider, Avatar, Grid, Paper } from '@material-ui/core';
import { Box, TextField } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
function RecipeDetail() {
  const args = JSON.parse(document.getElementById('data').text);
  //const list = args.list_of_item;
  const { foodName } = useParams();
  //const thisFood = list.find((i) => i.food === foodName);
  const request = require('request');
  const [instruction, setInstruction] = useState();
  const [mealImage, setImage] = useState();
  //const [ingredient, setIngredient] = useState([]);
  //const [measure, setMeasure] = useState([]);
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

      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
          <p style={{ textAlign: 'left' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed
            faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis.
            Pellentesque at interdum tortor. Quisque arcu quam, malesuada vel mauris et, posuere
            sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit metus, efficitur
            lobortis nisi quis, molestie porttitor metus. Pellentesque et neque risus. Aliquam
            vulputate, mauris vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
            lectus vitae ex.{' '}
          </p>
          <p style={{ textAlign: 'left', color: 'gray' }}>posted 1 minute ago</p>
        </Grid>
      </Grid>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
          <p style={{ textAlign: 'left' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed
            faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis.
            Pellentesque at interdum tortor. Quisque arcu quam, malesuada vel mauris et, posuere
            sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit metus, efficitur
            lobortis nisi quis, molestie porttitor metus. Pellentesque et neque risus. Aliquam
            vulputate, mauris vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
            lectus vitae ex.{' '}
          </p>
          <p style={{ textAlign: 'left', color: 'gray' }}>posted 1 minute ago</p>
        </Grid>
      </Grid>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Type your comment" variant="outlined" />
        <Button variant="contained" endIcon={<AddCommentIcon />}>
          Comment
        </Button>
      </Box>
    </div>
  );
}

export default RecipeDetail;
