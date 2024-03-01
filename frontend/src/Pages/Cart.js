import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useCart } from '../Context/cart'
import { useAuth } from '../Context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Cart = () => {
    const navigate = useNavigate()
    const [auth] = useAuth()
    const [cart, setCart] = useCart()
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("")
    const getToken = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API}/api/product/braintree/token`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            })
            const data = await response.json()
            if (data.success) {
                setClientToken(data.token)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getToken()
    }, [])

    const handlePayment = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/product/braintree/payment`, { nonce, cart })
            localStorage.removeItem('cart')
            setCart([])
            toast.success('Payment successful')
            setTimeout(() => {
                navigate('/dashboard/user/orders')
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    {/* <h1>Cart</h1> */}
                    <div className='mt-4'>
                        <h1>Cart has {cart.length} items</h1>
                        <table className="table table-bordered mt-4 text-center">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Price (₹)</th>
                                    <th>Quantity</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((p) => (
                                    <tr key={p._id}>
                                        <td>
                                            <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`} alt={p.name} style={{ width: '50px', height: '50px' }} />
                                        </td>
                                        <td>{p.name}</td>
                                        <td>{p.price}</td>
                                        <td>{p.quantity}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    let newCart = cart.filter((c) => c._id !== p._id)
                                                    localStorage.setItem('cart', JSON.stringify(newCart))
                                                    setCart(newCart)
                                                }}
                                                className='btn btn-danger'
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='text-center mt-4'>
                    <h2>Cart Summary</h2>
                    <h3>Total: ₹ {cart.reduce((acc, c) => acc + c.price * c.quantity, 0)}</h3>
                    <h4>Address: {auth?.user?.address}</h4>
                </div>

                <div className='mb-4 d-flex flex-column justify-content-center'>

                    {!clientToken || !auth?.token || !cart.length ? (
                        <>
                            <h2 className='text-center'>Please login and add items to cart</h2>
                            <button onClick={() => navigate('/login')} className='btn btn-primary'>Login</button>
                        </>
                    ) : (
                        <>
                            <DropIn
                                options={{
                                    authorization: clientToken,
                                    paypal: { flow: 'vault' }
                                }}
                                onInstance={(instance) => setInstance(instance)} />
                            <button onClick={handlePayment} className='btn btn-primary'>Pay</button>
                        </>
                    )}

                </div>
            </div>
        </Layout>
    )
}

export default Cart
