import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context";
export default function Header() {
    const {authenticatedUser, actions} = useContext(Context);
  return (
    <header>
        <div className="wrap header--flex">
        <h1 className="header--logo">
            <Link to="/">Courses</Link>
        </h1>
        {authenticatedUser? 
        <>
            <nav>
                <span>Welcome, {authenticatedUser.firstName} </span>
                <Link className='signout' to="/signOut" onClick={()=> actions.signOut()}>Sign Out</Link> 
            </nav>
        </>
        :
        <>
        <nav>
            <ul className="header--signedout">
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>
            <li>
                <Link to="/signin">Sign In</Link>
            </li>
            </ul>
        </nav>
        </>}

        </div>
    </header>
  );
}
