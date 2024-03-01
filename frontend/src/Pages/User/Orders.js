import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Context/auth'
import axios from 'axios'

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth()
    const [products, setProducts] = useState([])
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/auth/orders`, {
                headers: {
                    'Authorization': auth.token
                }
            })
            setOrders(data.orders)
            setProducts(data.orders.products)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getOrders()
    }, [])
    return (
        <Layout title="UserMenu">
            <div className='container m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card m-3 p-3'>
                            <h1>Your Orders</h1>
                            {orders.length > 0 ? (
                                <table className="table table-bordered mt-4 text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order Number</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            <tr key={order._id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{order.status}</td>
                                                <td>{order.createdAt}</td>
                                                <td>{order.payment.transaction.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <h4>No orders yet</h4>
                            )}
                            <div className='col-md-9'>
                                <h1>Products</h1>
                                <table className="table table-bordered mt-4 text-center">
                                    <thead>
                                        <tr>
                                            <th scope='col'>Order Number</th>
                                            <th scope='col'>Image</th>
                                            <th scope='col'>Name</th>
                                            <th scope='col'>Price (₹)</th>
                                            <th scope='col'>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order,index) => (
                                            order.products.map((product) => (
                                                <tr key={product._id}>
                                                    {index+1}
                                                    <td><img src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.quantity}</td>
                                                </tr>
                                            ))
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Orders
