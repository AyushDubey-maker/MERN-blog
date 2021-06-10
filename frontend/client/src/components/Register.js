import axios from 'axios'
import React, { useState } from 'react'

function Register() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfirmPassword]=useState('')

    // Register
    const register=async(e)=>{
        e.preventDefault();
        try{
            const registerData={
                email,
                password,
                confirmpassword,
            };
            await axios.post("http://localhost:5000/auth/",registerData,
            {withCredentials:true})
            .then(()=>alert("User Registered"))
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        }catch(err){
            alert(err.message)
        }
    }
    return (
        <div className="register_div">
           
            <form onSubmit={register}>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <input type="password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
                <button type="submit" disabled={!email || !password || !confirmpassword}>Register</button>
                <p>Already have an account ?<a href="/login">Login</a></p>
            </form> 
        </div>
    )
}

export default Register
