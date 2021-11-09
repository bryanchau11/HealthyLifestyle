/* eslint-disable eqeqeq */
import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { Button, Nav } from 'react-bootstrap';
import YoutubeEmbed from './YoutubeEmbed';
import 'bootstrap/dist/css/bootstrap.css';
import { Rating, RatingView } from 'react-simple-star-rating';
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
  });

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
    </div>
  );
}

export default RecipeDetail;
