import React, { useEffect } from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
// import { Layout } from ''
import Layout from '../../Components/Layout/Layout'
import { toast } from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Products = () => {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/get-product`)
            if (data.success) {
                setProducts(data.products)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <Layout>
            <div className='container m-3 p-3' >
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                  

                    <div className='col-md-9'>
                        <h3 className="text-center">All Products</h3>
                        <div className='d-flex flex-wrap' style={{alignItems:"baseline"}}>
                            {products.map((product, index) => {
                                return (
                                    <div key={index} className='card m-3' style={{ width: '18rem' ,border:"noneww"}}>
                                        <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`} alt={product.name}
                                            className='p-3' style={{ width: "18rem", borderRadius: "32px" }} />
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ fontWeight: "bolder" }}>{product.name}</h5>
                                            <p className="card-text" style={{ fontWeight: "italic" }}>{product.description.substring(0, 20)}.....</p>
                                            <p className="card-footer" style={{ fontWeight: "bolder" }}>Price: {product.price}</p>
                                           
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Products
