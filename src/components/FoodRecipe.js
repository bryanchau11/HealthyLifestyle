/* eslint-disable eqeqeq */
import { React, useState, useEffect } from 'react';
import { useParams, Link  } from 'react-router-dom';
import '../App.css';
import { Button, Nav } from 'react-bootstrap';
import YoutubeEmbed from './YoutubeEmbed';
import 'bootstrap/dist/css/bootstrap.css';
function RecipeDetail() {
  const args = JSON.parse(document.getElementById('data').text);
  const list = args.list_of_item;
  const { foodName } = useParams();
  const thisFood = list.find((i) => i.food === foodName);
  const request = require('request');
  const [instruction, setInstruction] = useState();
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
  useEffect(() =>  {
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
  return (
    <div>
      <h1>{thisFood.food}</h1>
      <img className="fixed_img" src={thisFood.image} alt="food pictures" />{' '}
       
      <h2>Ingredient</h2>
      <ul>
        {ingredientAndMeasure.map((item) => (
          <li>
            <Button style={{color: "black"}}  as={Link} to={`/nutrition/${item.ingre}`} variant="outline-info">{item.ingre} : {item.meas}</Button>
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
