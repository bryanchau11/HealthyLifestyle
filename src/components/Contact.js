/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable
react/no-array-index-key,
react-hooks/exhaustive-deps,
react/jsx-filename-extension,
quote-props,
*/
import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import noteBook from './note-pad-1425759.jpg';
import '../App.css';

export const Contact = () => {
  const form = useRef();
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [messageValue, setMessageValue] = useState('');

  const handleName = (e) => {
    setNameValue(e.target.value);
  };
  const handleEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const handleMessage = (e) => {
    setMessageValue(e.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (emailValue === '') {
      alert('Please Enter a Return Email');
      return;
    }
    if (nameValue === '') {
      alert('Please Enter a Name or UserName');
      return;
    }
    if (messageValue === '') {
      alert('No Message to Send');
      return;
    }
    emailjs.sendForm('healthyLifestyle', 'contact_healthyLifestyle', form.current, `${process.env.REACT_APP_UserID}`).then(
      (result) => {
        console.log(result.text);
        alert('Email Sent!');
        setNameValue('');
        setEmailValue('');
        setMessageValue('');
      },
      (error) => {
        alert('Oops, something went wrong');
        console.log(error.text);
      },
    );
  };
  const sectionStyle = {
    backgroundImage: `url(${noteBook})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };
  return (
    <div style={sectionStyle}>
      <div style={{ color: 'wheat' }}>
        <h1>Questions? Feedback? Contact Us!</h1>
        <form onSubmit={sendEmail} ref={form}>
          <label>Name:</label>
          <br />
          <input type="text" name="from_name" value={nameValue} onChange={handleName} placeholder="Name..." />
          <br />
          <label>Email:</label>
          <br />
          <input type="email" name="user_email" value={emailValue} onChange={handleEmail} placeholder="Email..." />
          <br />
          <label>Message:</label>
          <br />
          <textarea name="message" value={messageValue} onChange={handleMessage} placeholder="Message..." />
          <br />
          <input type="submit" name="Send" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
