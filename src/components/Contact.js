/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-one-expression-per-line */
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

import '../css/Contact.css';

const Swal = require('sweetalert2');

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter a Return Email!',
      });
      return;
    }
    if (nameValue === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter a Name or UserName!',
      });
      return;
    }
    if (messageValue === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No Message to Send!',
      });
      return;
    }
    emailjs.sendForm('healthyLifestyle', 'contact_healthyLifestyle', form.current, `${process.env.REACT_APP_UserID}`).then(
      (result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Email Sent!',
          text: 'We have received your email!',
        });
        setNameValue('');
        setEmailValue('');
        setMessageValue('');
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Oops, something went wrong!',
        });
        console.log(error.text);
      },
    );
  };

  return (
    <div style={{ height: '150vh' }}>
      <div style={{ height: '70vh' }} className="bg-info contact4 overflow-hiddedn position-relative">
        <div className="row no-gutters">
          <div className="container">
            <div className="col-lg-6 contact-box mb-4 mb-md-0">
              <div className="">
                <div className="shade">
                  <div className="blackboard">
                    <div className="form">
                      <h1 className="title font-weight-light text-white mt-2">Contact Us</h1>
                      <form className="mt-3" onSubmit={sendEmail} ref={form}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mt-2">
                              <input className="form-control text-white" type="text" name="from_name" value={nameValue} onChange={handleName} placeholder="Name..." />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group mt-2">
                              <input className="form-control text-white" type="email" name="user_email" value={emailValue} onChange={handleEmail} placeholder="Email..." />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group mt-2">
                              <textarea className="form-control text-white" rows="3" name="message" value={messageValue} onChange={handleMessage} placeholder="Message..." />
                            </div>
                          </div>
                          <div className="col-lg-12 d-flex align-items-center mt-2">
                            <button type="submit" className="btn bg-white text-inverse px-3 py-2" name="Send">
                              <span> Submit</span>
                            </button>
                            <span className="ml-auto text-white align-self-center">
                              <i className="icon-phone mr-2" />
                              123 456 7890
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 right-image p-r-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13269.175977192583!2d-84.3852819!3d33.753068!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4ac19f9be05c6e97!2sGeorgia%20State%20University!5e0!3m2!1sen!2sus!4v1637605866126!5m2!1sen!2sus"
          width="100%"
          height="538"
          frameBorder="0"
          style={{ border: '0' }}
          allowFullScreen
          data-aos="fade-left"
          data-aos-duration="3000"
        />
      </div>
    </div>
  );
};

export default Contact;
