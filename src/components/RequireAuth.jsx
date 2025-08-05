
import { Navigate, useLocation } from 'react-router-dom';
import {useUser} from '../Providers/UserProvider'

const RequireAuth = ({ children }) => {

    const {logedUserData} = useUser()

    console.log('logedUserData ', logedUserData)

    if(!logedUserData) {
        console.log('estoy aquiii');
        
        return <Navigate to="/"  />;
    }

    return children

  
}

export default RequireAuth