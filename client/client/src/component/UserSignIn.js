import axios from "axios";
import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import config from "../config";

export default function UserSignIn() {
  const [errors, setErrors] = useState("");
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  let emailRef = useRef("");
  let passRef = useRef("");

  /**
   * Function handleChange, is to update values n the Ref's as.
   * @param {event} e is event retrived once the element has been clicked
   */
  const handleChange = (e) => {
    if (e.target.id === "password") {
      passRef.current = e.target.value;
    }else if (e.target.id === "emailAddress") {
      emailRef.current = e.target.value;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!emailRef.current || !passRef.current){
     return setErrors('Email/Password Fields Cannot be left Empty!') 
    }
    const encodedCredentials = window.btoa(
      `${emailRef.current}:${passRef.current}`
    );
    const url = config.Url + "/users";
    // console.log(actions)
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Basic ${encodedCredentials}`,
      },
    };
    // const user = await actions
    //   .signIn(url, options)
    //   .then((user)=> {if(user === null){
    //     console.log('null')
    //   }})
    const response = await axios(url, options)
      .then((res) => res.data.users)
      .catch(err => setErrors(err.response.data.msg));

    if(response){
      response.Authorization = encodedCredentials;
      actions.signIn(response);
      navigate('/');

    }
  };
  return (
    <main>
      <div className="form--centered">
        {/* <h6>{authenticatedUser}</h6> */}
        <h2>Sign In</h2>
        {errors && (
          <div className="validation--errors">
            <h3>Validation Error</h3>
            <ul>
              <li>{errors}</li>
              {/* {errors.map((err,index) => <li key={index}>{err}</li>)} */}

            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
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
            Sign In
          </button>
          <button className="button button-secondary">Cancel</button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <a href="sign-up.html">sign up</a>!
        </p>
      </div>
    </main>
  );
}
