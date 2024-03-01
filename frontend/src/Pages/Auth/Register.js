import { React, useState } from 'react'
import Layout from '../../Components/Layout/Layout.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        // toast.dark('Submitted')
        // console.log(name, email, password, address)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, { name, email, password, phone, address })
            if (res.data.success) {
                toast.dark(res.data.message);
                setTimeout(() => {
                    navigate('/login');
                  }, 2000);     
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error);
        }

    }
    return (
        <Layout title="Register">
            <div className='register'>
                <form onSubmit={handleSubmit} className='form-container'>
                    <h1 className='bg-dark text-white p-2 text-center' style={{ borderRadius: "12px" }}>Create Account</h1>
                    <div className="mb-3">
                        <label for="exampleInputName" className="form-label">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder='John Doe' required />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='example@mail.com' required />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPhone" className="form-label">Phone</label>
                        <input type="tel"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            pattern='[0-9]{10}'
                            maxLength="10"
                            id="exampleInputPhone" placeholder='+91' required />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputAddress" className="form-label">Address</label>
                        <input type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            value={address}
                            id="exampleInputAddress"
                            placeholder='Address' required />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='********' required />
                    </div>
                    <div className="submit-btn gap-5">
                        <button type="submit" className="btn btn-primary">Sign In</button>
                        <NavLink to='/login' className='btn btn-secondary'>Login</NavLink>
                    </div>
                </form>
            </div>
        </Layout>

    )
}

export default Register
