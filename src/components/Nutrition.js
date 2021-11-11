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
// eslint-disable-next-line object-curly-newline
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
    const ingredientArray = [];
    // eslint-disable-next-line func-names
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
