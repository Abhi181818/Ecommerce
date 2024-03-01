import React from 'react'
import { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/auth';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()
    const location = useLocation()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, { email, password })
            if (res.data.success) {
                setAuth({ ...auth, user: res.data.user, token: res.data.token })
                localStorage.setItem("auth", JSON.stringify(res.data))
                toast.dark(res.data.message)
                setTimeout(() => {
                    navigate(location.state || '/');
                }, 2000);
            }

        } catch (error) {
            toast.error("Invalid credentials!!")
        }
    }

    return (
        <Layout title="Login">
            <div className='register'>
                <form onSubmit={handleSubmit} className='form-container'>
                    <h1 className='bg-dark text-white p-2 text-center' style={{ borderRadius: "12px" }}>Welcome Back!!</h1>
                    <div className="mb-3">
                        {/* <label for="exampleInputEmail1" className="form-label">Email address</label> */}
                        <input type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='Enter e-mail' required />
                    </div>
                    <div className="mb-3">
                        {/* <label for="exampleInputPassword1" className="form-label">Password</label> */}
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password" required />
                    </div>
                    <div className="mb-3 d-flex justify-content-end">
                        <NavLink to='/forgot-password'>Forgot Password?</NavLink>
                    </div>
                    <div className="submit-btn gap-5">
                        <button type="submit" className="btn btn-primary">Log in</button>
                        <NavLink to='/register' className='btn btn-secondary'>Sign In</NavLink>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login
