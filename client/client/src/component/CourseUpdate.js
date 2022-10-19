import React, { useEffect, useContext, useState, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import config from "../config";
import { Context } from "./Context";
import axios from "axios";

export default function CourseUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authenticatedUser } = useContext(Context);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [errors, setErrors] = useState();
  const titleRef = useRef("");
  const descRef = useRef("");
  const timeRef = useRef("");
  const materialsRef = useRef("");
  const url = config.Url + `/courses/${id}`;
  // console.log(authenticatedUser.id)
  useEffect(() => {
    async function course() {
      await axios(url).then((res) => {
        timeRef.current = res.data.course.estimatedTime;
        materialsRef.current = res.data.course.materialsNeeded;
        titleRef.current = res.data.course.title;
        descRef.current = res.data.course.description;
        setCurrentCourse(res.data.course);
      });
    }
    course().catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "courseTitle") {
      titleRef.current = e.target.value;
    } else if (e.target.id === "courseDescription") {
      descRef.current = e.target.value;
    } else if (e.target.id === "estimatedTime") {
      timeRef.current = e.target.value;
    } else {
      materialsRef.current = e.target.value;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current,
      description: descRef.current,
      estimatedTime: timeRef.current,
      materialsNeeded: materialsRef.current,
      userId: authenticatedUser.id,
    };
    const options = {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Basic ${authenticatedUser.Authorization}`,
      },
      data,
    };
    const response = await axios(url, options)
      .then((res) => res)
      .catch((err) =>{ 
        setErrors(err.response.data.errors)
      });
    
      if(response){
        navigate(`/courses/${id}`);
      }
  };
  return (
    <>
    {currentCourse? 
    <>
      {authenticatedUser.id === currentCourse.userId ?
      <main>    
          <div className="wrap">
            <h2>Update Course</h2>
            {errors && (
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
                    defaultValue={titleRef.current}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>
                    By {authenticatedUser.firstName} {authenticatedUser.lastName}
                  </p>
                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="courseDescription"
                    defaultValue={descRef.current}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    defaultValue={timeRef.current}
                    onChange={(e) => handleChange(e)}
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    defaultValue={materialsRef.current}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
              </div>
              <button className="button" type="submit">
                Update Course
              </button>
              <button
                className="button button-secondary"
                onClick={() => navigate(`/courses/${id}`)}
              >
                Cancel
              </button>
            </form>
          </div>
      </main>
      : <Navigate to={`/courses/${id}`} replace/>}</>
    :
      <h1>Loading...</h1>
    }
    </>
  );
}
