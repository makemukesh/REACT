import React from 'react'
import { useState } from 'react'
import {Form, userNavigate} from 'react-router-dom'
import "../pages/Home.css"

const Register = () => {
    const useNavigate= userNavigate();

    const [data,setForm]=useState({
        name:"",
        email:"",
        password:""
        
    });
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit=async (e) => {
        e.preventDefault();
        try {
           await registerUser(Form)
           alert("OTP sent to your email")
              navigate('/verify-otp', { state: { email: Form.email } });
        } catch (error) {
            alert("Registration failed. Please try again.")
        }
    }
    const Register = () => {
        return (
        <div className="auth-box">
        <h2>Register</h2>

    <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            name="username"
            placeholder="Username"
            value={form.name}
            onChange={handleChange}
            required
        />
        <input 
            type="email" 
            name="email"    
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
        />
        <button type="submit">Register</button>
    </form>
</div>
  )

}


    }
export default Register;