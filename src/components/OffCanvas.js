/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React, { Fragment, useState, useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import '../index.css';
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
  const [mealList, setMealList] = useState(null);

  useEffect(() => {
    const param = [];

    if (selectedOption != null) {
      for (let i = 0; i < selectedOption.length; i++) {
        param.push(selectedOption[i].label);
      }

      const options = {
        method: 'GET',
        url: 'https://themealdb.p.rapidapi.com/filter.php',
        qs: { i: param.join() },
        headers: {
          'x-rapidapi-host': 'themealdb.p.rapidapi.com',
          'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
          useQueryString: true,
        },
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const multiIngredients = [];
        const result = JSON.parse(body).meals;

        if (result != null) {
          if (result.length !== 107) {
            for (let i = 0; i < result.length; i++) {
              multiIngredients.push({ name: result[i].strMeal, image: result[i].strMealThumb });
            }
          }
        }
        setMealList(multiIngredients);
      });
    }
    setMealList(null);
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

          <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Enjoy your meal</h2>

              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-1 xl:gap-x-8">
                {mealList
                  ? mealList.map((item) => (
                      <div key={item.id} className="group relative">
                        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                          <img src={item.image} alt="." className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <Link to={`/recipe/${item.name}`}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {item.name}
                              </Link>
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))
                  : ''}
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;
