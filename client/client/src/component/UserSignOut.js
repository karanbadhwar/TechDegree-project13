import React, {useContext, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from './Context';

function UserSignOut() {
    const {authenticatedUser, actions} = useContext(Context);
    useEffect(() =>{
        if(authenticatedUser){
            actions.signOut();
        }
    })
 return (
    <Navigate to="/" replace />
  )
}

export default UserSignOut