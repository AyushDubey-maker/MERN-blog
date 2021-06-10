import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import AuthContext from '../context/AuthContext'

function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {getLoggedIn}=useContext(AuthContext)

    const history=useHistory('')
    // Login
    const login=async(e)=>{
        e.preventDefault();
        try{
            const loginData={
                email,
                password
            };
            await axios.post("http://localhost:5000/auth/login",loginData)
            .then(()=>history.push('/home'))
             await getLoggedIn()
        }catch(err){
            alert(err.message)
        }
    }
    
    return (
        <div className="login_div">
           
            <form onSubmit={login}>
            
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <button type="submit" disabled={!email || !password}>Login</button>
            </form>
        </div>
    )
}

export default Login
