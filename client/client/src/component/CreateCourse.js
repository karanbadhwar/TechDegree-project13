import axios from "axios";
import config from "../config";
import React, { useRef, useState, useContext } from "react";
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const { authenticatedUser } = useContext(Context);
  const titleRef = useRef("");
  const descRef = useRef("");
  const timeRef = useRef("");
  const materialRef = useRef("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    if (e.target.id === "courseTitle") {
      titleRef.current = e.target.value;
    } else if (e.target.id === "courseDescription") {
      descRef.current = e.target.value;
    } else if (e.target.id === "estimatedTime") {
      timeRef.current = e.target.value;
    } else if (e.target.id === "materialsNeeded") {
      materialRef.current = e.target.value;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = config.Url + "/courses";
    // materialRef.current.replace('\n', '\n\n'); 

    const data = {
      title: titleRef.current,
      description: descRef.current,
      estimatedTime: timeRef.current,
      materialsNeeded: materialRef.current,
      userId: authenticatedUser.id,
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Basic ${authenticatedUser.Authorization}`,
      },
      data,
    };
    const response = await axios(url, options) 
      .then((res) => res)
      .catch((err) => {
        setErrors(err.response.data.errors);
      });

    if(response){
      navigate('/');
    }
  };
  return (
    <main>
      <div className="wrap" >
        <h2>Create Course</h2>
        {errors.length > 0 && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
                {errors.map((err,index) => <li key={index}>{err}</li>)}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={titleRef.current.value}
                onChange={(e) => handleChange(e)}
              />
              <p>
                By {authenticatedUser.firstName} {authenticatedUser.lastName}
              </p>
              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={descRef.current.value}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={timeRef.current.value}
                onChange={(e) => handleChange(e)}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                onChange={(e) => handleChange(e)}
                value={materialRef.current.value}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <button className="button button-secondary">Cancel</button>
        </form>
      </div>
    </main>
  );
}
