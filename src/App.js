import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';

function App() {
  // fetches JSON data passed in by flask.render_template and loaded
  // in public/index.html in the script with id "data"
  const args = JSON.parse(document.getElementById('data').text);

  // TODO: Implement your main page as a React component.
  return (
    <>
      <h1> Welcome {args.current_user}</h1>
      <form id="signup" method="POST" action="/logout">
        <input id="submit" type="submit" value="LOGOUT" />
      </form>
    </>
  );
}

export default App;
