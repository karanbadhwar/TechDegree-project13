import React, { useState} from "react";
import Cookies from 'js-cookie';

export const Context = React.createContext();

export default function Provider (props){
    const cookie = Cookies.get('authenticatedUser');
    const [authenticatedUser, setAuthUser] = useState(cookie? JSON.parse(cookie): null);

    const signIn = async (user) =>{
        // console.log(user)
        setAuthUser(user);
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 })
        // console.log(this.state.authenticatedUser)
    }
   const signOut = () => {
        setAuthUser(null);
        Cookies.remove('authenticatedUser');
    }
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
