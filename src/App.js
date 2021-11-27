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
import { Container, Row, Col } from 'react-bootstrap';
import './Landing.css';
import Landing1 from './img/landing1.png';
import Landing2 from './img/landing2.png';
import Landing3 from './img/landing3.png';
import Header from './img/header.png';

function App() {
  return (
    <Container className="header">
      <Row>
        <Col>
          <Row>
            <h1 className="text-center mb-5 mt-5 prime-color">Welcome to Healthy LifeStyle!</h1>
          </Row>
          <Row>
            <h1 className="text-center">
              Discover the <span className="prime-color">flavors</span>
              <br />
              <span className="style-change">
                of <span className="prime-color">food</span>fun
              </span>
            </h1>
          </Row>
        </Col>
      </Row>
      <Row>
        <div class="col">
          <img src={Header} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="header" />
        </div>
      </Row>
      <Row style={{ backgroundColor: 'black', color: ' wheat' }}>
        <Col>
          <section class="showcase">
            <div class="container-fluid p-0">
              <div class="row no-gutters">
                <div class="col-lg-6 order-lg-2 text-white showcase-img">
                  <img src={Landing1} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="header" />
                </div>
                <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                  <h2>What functionality is</h2>
                  <p class="lead mb-0">Content To be added</p>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-lg-6 text-white showcase-img">
                  <img src={Landing2} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="header" />
                </div>
                <div class="col-lg-6 my-auto showcase-text">
                  <h2>Why it matter</h2>
                  <p class="lead mb-0">Content To be added</p>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-lg-6 order-lg-2 text-white showcase-img">
                  <img src={Landing3} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="header" />
                </div>
                <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                  <h2>Our Meal Plans</h2>
                  <p class="lead mb-0">Content To be added</p>
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
            <p className="text-center mb-5 mt-5 prime-color">Name 1</p>
          </Row>
        </Col>
        <Col>
          <Row>
            <p className="text-center mb-5 mt-5 prime-color">Name 2</p>
          </Row>
        </Col>
        <Col>
          <Row>
            <p className="text-center mb-5 mt-5 prime-color">Name 3</p>
          </Row>
        </Col>
        <Col>
          <Row>
            <p className="text-center mb-5 mt-5 prime-color">Name 4</p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default App;
