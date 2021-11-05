/* eslint-disable eqeqeq */
import { React, useState } from 'react';
import { useParams, Link  } from 'react-router-dom';
import '../App.css';
import { Button, Nav } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
function Nutrition() {
  
 
  const request = require('request');
  const [nutritionList, setList] = useState([]);
  const {ingredientName} = useParams();
  function NutritionAPI() {
    const options = {
      method: 'GET',
      url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
      qs: {query: `${ingredientName}`},
      headers: {
        'x-rapidapi-host': 'calorieninjas.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
        useQueryString: true
      }
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let result = JSON.parse(body).items[0];
      var ingredientArray =[];
      var key = '';
      for (key in result) {
          ingredientArray.push({
            name: key,
            unit: result[key],
          });
        
      }
      var ingredientAndMeasureResult = [];
      for (var i = 0; i < ingredientArray.length; i++) {
        ingredientAndMeasureResult.push({
          ingre: ingredientArray[i],
          meas: i,
        });
      }
      setList(ingredientArray);
    });
  }
  return (
    <div>
      <h1>{ingredientName}</h1>
      
      <Button onClick={NutritionAPI} variant="info">
      REVEAL {ingredientName}'s Nutrition Fact
      </Button>
      <ul>
        {nutritionList.map((item) => (
          <li>
         {item.name}  : {item.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Nutrition;