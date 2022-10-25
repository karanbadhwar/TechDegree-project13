import React, { useState, useEffect } from "react";
// import "../styles/global.css";
import config from "../config";
import axios from "axios";
// import { Context } from "./Context";
import { Link } from "react-router-dom";

const Courses = () => {
  // const { authenticatedUser } = useContext(Context);
  const Url = config.Url + "/courses";
  const [dataFetched, setDataFetched] = useState();
  useEffect(() => {
    const values = [];
    axios
      .get(Url)
      .then((data) => data.data.courses.forEach((el) => values.push(el)))
      .then(() => setDataFetched(values));
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div className="wrap main--grid">
        {dataFetched ? (
          dataFetched.map((course) => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className="course--module course--link"
              href={`course-detail.html/${course.id}`}
            >
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
