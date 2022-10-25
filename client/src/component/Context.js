import React, { useState} from "react";
import Cookies from 'js-cookie';

export const Context = React.createContext();

export default function Provider (props){
    const cookie = Cookies.get('authenticatedUser');
    const [authenticatedUser, setAuthUser] = useState(cookie? JSON.parse(cookie): null);

    /**
     * signIn Function, makes the Signed In user available throughout the app to make Header flexible.
     * @param {*} user, recieves an argument which is the Signed in user 
     */
    const signIn = async (user) =>{
        // console.log(user)
        setAuthUser(user);
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 })
        // console.log(this.state.authenticatedUser)
    }
    /**
     * Function signOut - Being passed to the Header Component via useContext.
     * Removes the Authenticated User and Removes the Saved Cookie.
     */
   const signOut = () => {
        setAuthUser(null);
        Cookies.remove('authenticatedUser');
    }
    // Value object being passed to the Provider to make it available throught the app via Consumer or useContext.
    const value={
        actions:{
            signIn: signIn,
            signOut: signOut
        },
        authenticatedUser:authenticatedUser
    }
        return (
            <Context.Provider value={value}>
                {props.children}
            </Context.Provider>
        )
    }
