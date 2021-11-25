/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import Select from 'react-select';

import '../App.css';

const request = require('request');

function OffCanvas() {
  const [show, setShow] = useState(false);

  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleClose = () => {
    setShow(false);
    setSelectedOption([]);
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/list.php',
      qs: { i: 'list' },
      headers: {
        'x-rapidapi-host': 'themealdb.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
        useQueryString: true,
      },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body).meals;

      const val = [];
      for (let i = 0; i < result.length; i++) {
        val.push({
          value: result[i].strIngredient,
          label: result[i].strIngredient,
        });
      }
      setIngredientOptions(val);
    });
  }, []);

  useEffect(() => {
    const param = [];
    if (selectedOption != null) {
      for (let i = 0; i < selectedOption.length; i++) {
        param.push(selectedOption.value);
      }
    }
    console.log(param);
  }, [selectedOption]);
  return (
    <>
      <Button className="font-nav-bar" variant="success" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Ingredient</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Select isMulti onChange={setSelectedOption} options={ingredientOptions} />
          {console.log(selectedOption)}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;
