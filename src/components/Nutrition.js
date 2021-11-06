/* eslint-disable eqeqeq */
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
const request = require('request');
function Nutrition() {
  const { ingredientName } = useParams();
  const [nutritionList, setList] = useState([]);
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
    var ingredientArray = [];
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let result = JSON.parse(body).items[0];

      var key = '';
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
  return (
    <div>
      <h1>{ingredientName}'s Nutrition Fact per serving size of 100g</h1>
      <ul>
        {nutritionList.map((item) => (
          <li>
            {item.name} : {item.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Nutrition;
