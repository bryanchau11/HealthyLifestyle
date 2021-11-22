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

function App() {
  return (
    <Container className="header  ">
      <Row style={{ backgroundColor: 'black', color: ' wheat' }}>
        <Col>
          <h1 className="text-center">
            Discover the <span className="prime-color">flavors</span>
            <br />
            <span className="style-change">
              of <span className="prime-color">food</span>fun
            </span>
          </h1>
        </Col>
      </Row>
    </Container>
  );
}
export default App;
