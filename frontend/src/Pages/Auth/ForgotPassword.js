import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [otp, setOtp] = useState()
    const [newPassword, setNewPassword] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/forgot-password`, { email, otp, newPassword })
            if (res.data.success) {
                toast.dark(res.data.message)
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            }
        } catch (error) {
            toast.error(error)
        }


    }
    return (
        <Layout title="Forgot Password">
            <div className='register'>
                <form className='form-container' onSubmit={handleSubmit}>
                    <h1 className='bg-dark text-white p-2 text-center' style={{ borderRadius: "12px" }}>Reset Password</h1>
                    <div className='mb-3'>
                        <input type='email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className='form-control'
                            id='exampleInputEmail1'
                            placeholder='Enter e-mail' required />
                    </div>
                    <div className='mb-3'>
                        <input type='text'
                            className='form-control'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            id='otp'
                            placeholder='Enter OTP' required />
                    </div>
                    <div className='mb-3'>
                        <input type='password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className='form-control'
                            id='exampleInputPassword1'
                            placeholder='New Password' required />
                    </div>
                    <div className='submit-btn'>
                        <button type='submit' className='btn btn-primary'>Reset Password</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword
