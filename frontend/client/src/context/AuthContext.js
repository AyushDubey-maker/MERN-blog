import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const AuthContext=createContext()
function AuthContextProvider(props) {
    const [loggedIn,setLoggedIn]=useState(undefined)
    const [userData,setUserData]=useState([])
    async function getLoggedIn(){
        const loggedInRes=await axios.get("http://localhost:5000/auth/loggedIn")
        setLoggedIn(loggedInRes.data)
        const userDataRes=await axios.get("http://localhost:5000/auth/userdata")
        setUserData(userDataRes.data)

    }
    
    useEffect(()=>{
        getLoggedIn()
        // eslint-disable-next-line
    },[])
    return (
        <AuthContext.Provider value={{loggedIn,userData,getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext
export  {AuthContextProvider}