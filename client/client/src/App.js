import './App.css';
import React from 'react';
import Courses from './component/Courses';
import CourseDetails from './component/CourseDetails';
import UserSignIn from './component/UserSignIn';
import UserSignUp from './component/UserSignUp';
import CreateCourse from './component/CreateCourse';
import CourseUpdate from './component/CourseUpdate';
import Header from './component/Header';
import '../src/styles/reset.css';
import '../src/styles/global.css';
import {Route, Routes} from 'react-router-dom';
import PrivateRoute from './component/PrivateRoute';
import NotFound from './component/errors/NotFound';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Courses />} />
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="courses/create" element={<PrivateRoute><CreateCourse /></PrivateRoute>} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="courses/:id/update" element={<PrivateRoute><CourseUpdate /></PrivateRoute>} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
