import React from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../Context/cart'
const ProductDetails = () => {
    const [cart, setCart] = useCart()
    const match = useParams()
    const [product, setProduct] = useState({})
    const getProd = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/get-product/${match.slug}`)
        setProduct(data.product)
    }
    useEffect(() => {
        if (match?.slug)
            getProd()
    }, [match?.slug])
    const imgSrc = `${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`
    return (
        <Layout>
            <div className="row container mt-3">
                <div className="col-md-6 product-image" style={{padding:"40px"}}>
                    <img src={imgSrc} alt={product.name} className="img-fluid" style={{ borderRadius: "12px"}}
                    />
                </div>
                <div className="col-md-6" style={{padding:"40px"}}>
                    <h2><b>{product.name}</b></h2>
                    <p><i>Description:</i> <br></br>{product.description}</p>
                    <h5>Category: {product.category?.name}</h5>
                    <h5><b>Price:💰 {product.price}</b></h5>
                    <button className="btn btn-primary ms-1 add-to-cart-btn"
                                            onClick={() => {
                                                setCart([...cart, product])
                                                localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                                toast.success('Product added to cart')
                                            }}>Add to cart</button>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
