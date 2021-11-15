/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';
import { OverlayTrigger, Button, Popover } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import '../App.css';

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
  ];
  // const popover = <Popover id="popover-basic"></Popover>;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ChatBot headerTitle="Waifu Bot" recognitionEnable="true" steps={steps} {...config} />;
}
export default Chatbot;
