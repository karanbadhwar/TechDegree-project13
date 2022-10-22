import React,{useContext} from 'react';
import { Context } from './Context';
import { Navigate, useLocation } from 'react-router-dom'

function PrivateRoute({children}) {
    const location = useLocation()
;    const {authenticatedUser} = useContext(Context);
    if(!authenticatedUser){
        return <Navigate to="/signin" replace state={{ from: location}}/>
    }
    return children

}
export default PrivateRoute