import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  // fetches JSON data passed in by flask.render_template and loaded
  // in public/index.html in the script with id "data"
  const args = JSON.parse(document.getElementById('data').text);
  const list = args.list_of_item;
  return (
    <>
      <h1> Recommended Meals</h1>
      <ul>
        {list.map((item) => (
          <li key={item.food}>
            <Link to={`/recipe/${item.food}`}>
            <div>{item.food}</div>
            <div>
              <img className="fixed_img" src={item.image} alt="food pictures" />{' '}
            </div>
            </Link>
            
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
