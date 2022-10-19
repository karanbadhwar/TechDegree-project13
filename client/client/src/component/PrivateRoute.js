import React,{useContext} from 'react';
import { Context } from './Context';
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
    const {authenticatedUser} = useContext(Context);
    if(!authenticatedUser){
        return <Navigate to="/signin" replace />
    }
    return children

}
export default PrivateRoute