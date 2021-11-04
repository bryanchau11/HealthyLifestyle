import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Navigation';
import NotFoundPage from './pages/NotFound';
import Users from './components/User';
import Contact from './components/Contact';
const routing = (
  <Router>
    <div>
      <Header />
      <Routes>
        <Route path="/index" element={<App />} />
        <Route path="/users" element={<Users />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
