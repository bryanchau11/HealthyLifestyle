import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs.sendForm('healthyLifestyle', 'contact_healthyLifestyle',form.current, 'user_iHEKSYbKPnoYyob6LLTdv')
      .then((result) => {
          console.log(result.text);
         
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={sendEmail} ref={form}>
      <label>Name:</label>
      <input type="text" name="form_name"/>
      <br/><br/>
      <label>Email:</label>
      <input type="email" name="user_email"/>
      <br/><br/>
      <label>Message:</label>
      <textarea name="message" />
      <input type="submit" name="Send" value="Send"/>
      </form>
    </div>
  );
};

export default Contact;

