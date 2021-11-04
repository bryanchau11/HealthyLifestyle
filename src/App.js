import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';

function App() {
  // fetches JSON data passed in by flask.render_template and loaded
  // in public/index.html in the script with id "data"
  const args = JSON.parse(document.getElementById('data').text);
  const list = args.list_of_item;
  //const recommendedFood = args.list_of_food;
  //const recommendedFoodImage = args.list_of_image;
  /*(const data = [{ foodName: args.list_of_food }, { foodImage: args.list_of_image }];
  const listItems = data.map((d) => (
    <li>
      {d.foodName}
      {d.foodImage}
    </li>
  )); */
  // TODO: Implement your main page as a React component.
  return (
    <>
      <h1> Recommended Meals</h1>
      <ul>
        {list.map((item) => (
          <li key={item.food}>
            <div>{item.food}</div>
            <div>
              <img className="fixed_img" src={item.image} alt="food pictures" />{' '}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
