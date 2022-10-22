import React, { useEffect, useState, useContext } from "react";
import ReactMarkdown from "react-markdown";
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

  useEffect(() => {
    async function fetchData() {
      return await axios
        .get(url)
        .then((data) => {
          if(data){
            return data.data.course
          }
        })
        .then((el) => {
          if(el){
            setCurrentCourse(el);
          }
        });
    }

    fetchData()
      .catch((err) =>{
        if(err.response.status === 404){
          return navigate('*', {replace:true})
        } else{
          return('/errors', {replace:true});
        }
      });
  }, []);

    /**
     * delete method function, is to send a Delete fetch request to the Server.
     * It is an async function and passes the options Object to the axios function 
     */
  const deleteMethod = async () => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${authenticatedUser.Authorization}`,
      },
    };
    await axios(url, options)
      .then((res) => {
        if(res.status === 204){
          navigate('/', {replace:true})
        }
      })
      .catch((err) => console.log(err));

  };

  return (

      <main>
        {currentCourse ? (
          <>
          <><div className="actions--bar">
      <div className="wrap">
      {authenticatedUser && currentCourse.userId === authenticatedUser.id ? (
          <>
            <Link className="button" to={`/courses/${id}/update`}>
              Update Course
            </Link>
            <button className="button" onClick={deleteMethod}>
              Delete Course
            </button>
          </>
        ) : null}
        <Link className="button button-secondary" to="/">
          Return to List
        </Link>
      </div>
    </div><div className="wrap">
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
              {/* {currentCourse.description.split("\n\n").map((data, index) => (
                <p key={index}>{data}</p>
              ))} */}
              <ReactMarkdown>{currentCourse.description}</ReactMarkdown>
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
                {currentCourse.materialsNeeded ?
                  <ReactMarkdown children={currentCourse.materialsNeeded}></ReactMarkdown>
                : (
                  <ReactMarkdown>
                    Owner did not mention anything regarding Materials Needed!
                  </ReactMarkdown>
                )}
              </ul>
            </div>
          </div>
        </form>
      </div></>
          </>
        ) : (
          <h1>Loading..</h1>
        )}
      </main>
  );
}
