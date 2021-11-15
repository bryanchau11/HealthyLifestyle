/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Footer from './components/Footer';
import Header from './components/Navigation';
import NotFoundPage from './pages/NotFound';
import Users from './components/User';
// eslint-disable-next-line import/no-named-as-default
import Contact from './components/Contact';
import RecipeDetail from './components/FoodRecipe';
import Category from './components/Category';
import Nutrition from './components/Nutrition';
import Search from './components/Search';
import AreaAndIngredient from './components/AreaAndIngredient';
import Chatbot from './components/Chatbot';

const routing = (
  <Router>
    <div>
      <Header />
      <Routes>
        <Route exact path="/index" element={<App />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/recipe/:foodName" element={<RecipeDetail />} />
        <Route exact path="/category/:categoryName" element={<Category />} />
        <Route exact path="/nutrition/:ingredientName" element={<Nutrition />} />
        <Route exact path="/search/:searchMeal" element={<Search />} />
        <Route exact path="/dropdown/:result" element={<AreaAndIngredient />} />
        <Route element={<NotFoundPage />} />
      </Routes>
      {/* <Footer / > */}
      <Chatbot />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
