import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Navigation';
import NotFoundPage from './pages/NotFound';
const routing  = ( 
  <Router>
    <div>
      <Header/>
      <Routes>
        <Route exact path="/index" component={App}/>
        <Route component={NotFoundPage} />
      </Routes>
      <Footer/>
    </div>
  </Router>
 
);
ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
