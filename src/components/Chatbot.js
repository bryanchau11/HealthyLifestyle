/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Button, Popover } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import '../App.css';

const request = require('request');

function Chatbot() {
  const args = JSON.parse(document.getElementById('data').text);

  const navigate = useNavigate();
  function Search(props) {
    const { steps } = props;
    const result = steps.search.value;
    useEffect(() => {
      navigate(`/search/${result}`);
    }, []);

    return <div> You will be redirected shortly</div>;
  }
  function Profile(props) {
    useEffect(() => {
      navigate('/users');
    }, []);
    return <div> You will be redirected shortly</div>;
  }
  function Contact(props) {
    useEffect(() => {
      navigate('/contact');
    }, []);
    return <div> You will be redirected shortly</div>;
  }
  const config = {
    width: '400px',
    height: '500px',
    floating: true,
  };
  function validator(value) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(value)) {
      return 'value should be a number';
    }
    if (value < 0) {
      return 'value should be positive';
    }

    return true;
  }
  function Calories(props) {
    const { steps } = props;
    const result = steps.userFoodCalories.value;
    const [calories, setCalories] = useState();
    const [totalWeight, setTotalWeight] = useState();
    const [dietLabel, setDietLabel] = useState([]);
    useEffect(() => {
      const options = {
        method: 'GET',
        url: 'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data',
        qs: { ingr: result },
        headers: {
          'x-rapidapi-host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com',
          'x-rapidapi-key': `${process.env.REACT_APP_RapidAPI}`,
          useQueryString: true,
        },
      };

      // eslint-disable-next-line func-names
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const caloriesResult = JSON.parse(body);
        const diet = [];
        setCalories(caloriesResult.calories);
        setTotalWeight(caloriesResult.totalWeight);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < caloriesResult.dietLabels.length; i++) {
          diet.push(caloriesResult.dietLabels[i]);
        }
        setDietLabel(diet);
      });
    }, []);
    return (
      <div>
        <div>Calories: {calories}</div>
        <br />
        <div>Total Weights: {totalWeight}</div> <br />
        <div>Diet Labels:</div>
        <ul>
          {dietLabel.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  const BMI = (props) => {
    const { steps } = props;
    const height = steps.height.value;
    const weight = steps.weight.value;
    const bmi = Number(((weight / (height * height)) * 10000).toFixed(1));
    let result = 'Underweight';

    if (bmi >= 18.5 && bmi < 25) {
      result = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      result = 'Overweight';
    } else if (bmi >= 30) {
      result = 'Obesity';
    }

    return (
      <div className="test">
        Your BMI is {bmi} ({result})
      </div>
    );
  };

  BMI.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    steps: PropTypes.object,
  };

  BMI.defaultProps = {
    steps: undefined,
  };
  const steps = [
    {
      id: 'greeting-user',
      message: `Hello ${args.current_user}`,
      trigger: '1',
    },
    {
      id: '1',
      message: 'How may I help you ? :) ',
      trigger: 'initial-option',
    },
    {
      id: 'initial-option',
      options: [
        { value: 1, label: 'Search meal', trigger: 'ask-to-eat' },
        { value: 2, label: 'Edit profile', trigger: 'edit-profile' },
        { value: 3, label: 'Contact us', trigger: 'contact-us' },
        { value: 4, label: 'Choose your ingredients', trigger: 'choose-ingredient' },
        { value: 5, label: 'BMI', trigger: 'calculate-bmi' },
        { value: 6, label: 'Calories & Total Weights', trigger: 'calories-weight' },
      ],
    },
    {
      id: 'edit-profile',
      component: <Profile />,
      trigger: '1',
    },
    {
      id: 'contact-us',
      component: <Contact />,
      trigger: '1',
    },
    {
      id: 'ask-to-eat',
      message: 'What would you like to eat?',
      trigger: 'search',
    },
    {
      id: 'search',
      user: true,
      trigger: 'search-answer',
    },
    {
      id: 'search-answer',
      message: 'Yeah, one moment please !',
      trigger: 'search-redirect',
    },
    {
      id: 'search-redirect',
      component: <Search />,
      trigger: '1',
    },
    {
      id: 'choose-ingredient',
      message: 'Sorry, this feature is being developed',
      trigger: '1',
    },
    {
      id: 'calculate-bmi',
      message: "Let's calculate your BMI (Body Mass Index)",
      trigger: 'calculate-bmi2',
    },
    {
      id: 'calculate-bmi2',
      message: 'Please type your height (cm)',
      trigger: 'height',
    },
    {
      id: 'height',
      user: true,
      trigger: 'calculate-bmi3',
      validator,
    },
    {
      id: 'calculate-bmi3',
      message: 'Please type your weight (kg)',
      trigger: 'weight',
    },
    {
      id: 'weight',
      user: true,
      trigger: 'get-result',
      validator,
    },
    {
      id: 'get-result',
      message: 'Thanks! Check out your BMI',
      trigger: 'get-result2',
    },
    {
      id: 'get-result2',
      component: <BMI />,
      trigger: '1',
    },
    {
      id: 'calories-weight',
      message: 'So, here is the thing...',
      trigger: 'calories-weight2',
    },
    {
      id: 'calories-weight2',
      message: 'Enter what ingredient you want with its quantity, and as many as you want',
      trigger: 'calories-weight3',
    },
    {
      id: 'calories-weight3',
      message: 'For example, you want to know how much calories of 1 large apple, 2 bananas? ',
      trigger: 'calories-weight4',
    },
    {
      id: 'calories-weight4',
      message: 'Calories: 321, total weight: 454.4',
      trigger: 'calories-weight5',
    },
    {
      id: 'calories-weight5',
      message: 'Now its your turn! type something you want to know about, Im very knowledgable',
      trigger: 'userFoodCalories',
    },
    {
      id: 'userFoodCalories',
      user: true,
      trigger: 'calories-weight6',
    },
    {
      id: 'calories-weight6',
      component: <Calories />,
      trigger: '1',
    },
  ];
  // const popover = <Popover id="popover-basic"></Popover>;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ChatBot headerTitle="Waifu Bot" recognitionEnable="true" steps={steps} {...config} />;
}
export default Chatbot;
