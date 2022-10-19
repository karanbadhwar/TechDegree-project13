import React, { useEffect, useState, useContext } from "react";
import ReactMarkdown from "react-markdown";
// import { Link } from "react-router-dom";
import config from "../config";
import axios from "axios";
import { Context } from "./Context";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = config.Url + `/courses/${id}`;
  const { authenticatedUser } = useContext(Context);
  const [currentCourse, setCurrentCourse] = useState();
  const [response, setResponse] = useState(true);

  useEffect(() => {
    async function fetchData() {
       await axios
        .get(url)
        .then((data) => data.data.course)
        .then((el) => {
          setCurrentCourse(el);
        });
    }

    fetchData()
      .catch((err) => console.log(err));
  }, []);

  const deleteMethod = async () => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${authenticatedUser.Authorization}`,
      },
    };
    await axios(url, options)
      .then((res) => res)
      .catch((err) => console.log(err));

  };

  return (
    <main>   
      {currentCourse ? (
        <div className="actions--bar">
          <div className="wrap">
            {currentCourse.userId === authenticatedUser.id ? (
              <>
                <Link className="button" to={`/courses/${id}/update`}>
                  Update Course
                </Link>
                <Link className="button" to="/" onClick={deleteMethod}>
                  Delete Course
                </Link>
              </>
            ) : null}
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
      ) : null}
      {currentCourse ? (
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{currentCourse.title}</h4>
                <p>
                  By {currentCourse.User.firstName}{" "}
                  {currentCourse.User.lastName}
                </p>
                {currentCourse.description.split("\n\n").map((data, index) => (
                  <p key={index}>{data}</p>
                ))}
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>
                  {currentCourse.estimatedTime ? (
                    currentCourse.estimatedTime
                  ) : (
                    <em>Owner did not mention the Estimated Time</em>
                  )}
                </p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {currentCourse.materialsNeeded ? (
                    currentCourse.materialsNeeded
                      .split("\n")
                      .map((data, index) => {
                        if (data) {
                          return <li key={index}>{data.slice(1)}</li>;
                        }
                      })
                  ) : (
                    <em>
                      Owner did not mention anything regarding Materials Needed!
                    </em>
                  )}
                </ul>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <h1>Loading..</h1>
      )}
    </main>
  );
}
