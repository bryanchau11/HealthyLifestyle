/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-loop-func */
/* eslint-disable react/no-unescaped-entities */
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
// import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import './Landing.css';
import Landing1 from './img/landing1.png';
import Landing2 from './img/landing2.png';
import Landing3 from './img/landing3.png';

function App() {
  return (
    <div className="centered">
      <Row>
        <div class="col" style={{ backgroundColor: 'black', fontSize: ' 35px', height: '30vh' }}>
          <h1 className="text-center mb-5 mt-5" style={{ color: 'wheat' }}>
            Welcome to Healthy LifeStyle!
          </h1>
          <h1 className="text-center" style={{ color: 'orange' }}>
            Discover the <span style={{ color: 'wheat' }}>flavors</span>
            <br />
            <span className="style-change" style={{ color: 'orange' }}>
              of <span style={{ color: 'wheat' }}>food</span>fun
            </span>
          </h1>
        </div>
      </Row>
      <Row style={{ backgroundColor: 'black', color: ' wheat' }}>
        <Col>
          <section class="showcase">
            <div class="container-fluid p-0">
              <div class="row no-gutters">
                <div class="col-lg-6 order-lg-2 text-white showcase-img">
                  <img src={Landing1} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="Header" />
                </div>
                <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                  <h2>FUNCTIONALITY</h2>
                  <p class="lead mb-0">
                    Our app can display foods by the area and their nutritional value; the user can also choose a recipe and cook that meal. Another feature is our EAT list and a link to YouTube where they can be taught how to cook a specific meal of their choosing. Other functionalities are the
                    Chatbot, search filter, search box, multi-ingredients, comment on the food, rate food, and contact page. Our app displays the specific ingredients for specific dishes and filters by a particular category. Our app also has a function to calculate BMI and body fat percentage.
                  </p>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-lg-6 text-white showcase-img">
                  <img src={Landing2} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="Header" />
                </div>
                <div class="col-lg-6 my-auto showcase-text">
                  <h2>WHY IT MATTERS</h2>
                  <p class="lead mb-0">
                    These functionalities allow our users to choose a specific meal plan that works for them. Each function assists with the process of picking a meal that will work well with their diet. These functions matter because this gives our users options to make the best choice for their
                    health. This enables our users to create a meal plan consistently with the assistance of visual aids to make their diet goals a reality.
                  </p>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-lg-6 order-lg-2 text-white showcase-img">
                  <img src={Landing3} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="Header" />
                </div>
                <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                  <h2>OUR MISSION STATEMENT</h2>
                  <p class="lead mb-0">
                    Our end goal Healthy Lifestyle app seeks to create healthy and delicious meal plan options for our users. We strive to give our users consistent options to regulate their dietary needs. Our overall goal is to enable users to choose what’s best for their daily nutritional intake
                    by utilizing the BMI and Body Fat Percentage calculators.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Col>
      </Row>
      <Row style={{ backgroundColor: 'black', color: ' wheat' }}>
        <h2>Who It Is Made By</h2>
        <Col>
          <Row>
            <p className="text-center mb-5 mt-5 prime-color">Bryan Chau</p>
          </Row>
        </Col>
        <Col>
          <Row>
            <p className="text-center mb-5 mt-5 prime-color">Mahdsiah Khaalik</p>
          </Row>
        </Col>
        <Col>
          <Row>
            <p className="text-center mb-5 mt-5 prime-color">Christopher Lavey</p>
          </Row>
        </Col>
        <Col>
          <Row>
            <p className="text-center mb-5 mt-5 prime-color">Sidney Williams</p>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default App;
