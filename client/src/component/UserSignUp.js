import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";
import axios from "axios";

export default function UserSignUp() {
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  let firstRef = useRef("");
  let lastRef = useRef("");
  let emailRef = useRef("");
  let passRef = useRef("");

    /**
     * function handleChange, it updates the respective Ref's which we will use in the handleSubmit Function.
     * @param {*} e Event
     */
  const handleChange = (e) => {
    if (e.target.id === "firstName") {
      firstRef.current = e.target.value;
    } else if (e.target.id === "lastName") {
      lastRef.current = e.target.value;
    } else if (e.target.id === "emailAddress") {
      emailRef.current = e.target.value;
    } else {
      passRef.current = e.target.value;
    }
  };

  /**
   * Function handleCancel, It cancels out the rquest to submit the New User Form and redirects the User
   */
  const handleCancel = () =>{
    navigate('/', {replace:true})
  }
  /**
   * Function handleSubmit, it creates a POSr User Request via Axios 
   * @param {*} e - Event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = config.Url + "/users";
    const data = {
      firstName: firstRef.current,
      lastName: lastRef.current,
      emailAddress: emailRef.current,
      password: passRef.current,
    };
    await axios
      .post(url, {data})
      .then(() => {
        console.log("Created");
        navigate('/signin')
    })
      .catch((err) => {
        console.log(err.request.response)
        const errors = JSON.parse(err.request.response).errors;
        console.log(errors);
        setErrors(JSON.parse(err.request.response).errors)
      });
    
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
       {errors && <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((errMsg,index) => <li key={index}>{errMsg}</li>)}
                    </ul>
        </div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstRef.current.value}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastRef.current.value}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailRef.current.value}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={passRef.current.value}
            onChange={(e) => handleChange(e)}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            <Link to="/">Cancel</Link>
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
}
