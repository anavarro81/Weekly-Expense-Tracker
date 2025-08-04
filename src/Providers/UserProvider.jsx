import React, { createContext, useState } from 'react';
import { useContext } from 'react';

const UserContext = createContext();

// {
//     "email": "antonio3@hotmail.com",
//     "user": "Antonio",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGIxNTYzODAyY2UyYWI2NDI1ODcyNCIsImVtYWlsIjoiYW50b25pbzNAaG90bWFpbC5jb20iLCJpYXQiOjE3NTQzMTQ0NzAsImV4cCI6MTc1NDMxODA3MH0.BynSrTC0cf0nygcRjDbHtFknIRthqeXMLGwgfX9o6qk"
// }

export const UserProvider = ({ children }) => {
    
    const INITIAL_DATA = {
        email: "",
        user: "",
        token: ""
    }

    const [logedUserData, setLogedUserData] = useState(INITIAL_DATA);
    
    return (
        <UserContext.Provider value={{ logedUserData, setLogedUserData }}>
            {children}
        </UserContext.Provider>
    );

};

export const useUser = () => {
    
    const context = useContext(UserContext)

    if(!context) {
        throw new Error ("UserContext debe usarse dentro de UserProvider")
    }

    return context 

}

