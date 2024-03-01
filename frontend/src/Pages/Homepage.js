import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../Context/auth'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import HomeCarousel from '../HomeCarousel'
import { Checkbox, Radio } from "antd";
import { Prices } from '../Components/Price'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { set } from 'mongoose'
import { toast } from 'react-toastify'
import { useCart } from '../Context/cart'
const Homepage = () => {
    const [cart, setCart] = useCart()
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [myFilters, setMyFilters] = useState([])
    const [price, setPrice] = useState('')
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const getTotalCount = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-count`)
        setTotal(data.totalProducts)
    }
    useEffect(() => {
        if (page == 1) return
        loadMore()
    }, [page])
    const loadMore = async () => {
        setLoading(true)
        const newPage = page + 1
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-list/${newPage}`)
        setLoading(false)
        setProducts([...products, ...data.products])
        setPage(newPage)
    }
    const handleFilters = (e, category) => {
        let newFilters = [...myFilters]
        if (e.target.checked) {
            newFilters.push(category)
        } else {
            newFilters = newFilters.filter((c) => c !== category)
        }
        setMyFilters(newFilters)
        // console.log(myFilters)
    }
    const getAllProducts = async () => {
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-list/${page}`)
        setLoading(false)
        setProducts(data.products)
    }
    const getAllCategories = async () => {
        // const response = await fetch(`${process.env.REACT_APP_API}/api/category/get-categories`)
        // const data = await response.json()
        // console.log(data)
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-categories`)

        setCategories(data.categories)
    }
    const getFilteredProducts = async (myFilters, price) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/product/product-filter?category=${myFilters}&price=${price}`)
            // console.log(price)
            setProducts(data.products)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        // getAllProducts()
        getAllCategories()
        // getFilteredProducts()
        getTotalCount()

    }, [])
    useEffect(() => {
        if (myFilters.length || price.length) {
            getFilteredProducts(myFilters, price)
        }
    }, [myFilters, price])
    useEffect(() => {
        if (!myFilters.length && !price.length) getAllProducts();
    }, [myFilters.length, price.length]);
    return (
        <Layout title="All products">
            <HomeCarousel />
            <div className="row mt-3">
                <div className='col-md-3'>
                    <h3 className="text-center">Filter By Categories</h3>
                    <div className="d-flex justify-content-center m-5 ">
                        {categories.map((category, index) => {
                            return (
                                <Checkbox
                                    onChange={(e) => handleFilters(e, category._id)}
                                    key={index}
                                >
                                    {category.name}
                                </Checkbox>
                            )
                        }
                        )}
                    </div>
                    <h3 className="text-center">Filter By Price</h3>
                    <div className="d-flex justify-content-center ">
                        <Radio.Group onChange={e => setPrice(e.target.value)}>
                            {Prices.map((price, index) => {
                                return (
                                    <div key={index}>
                                        <Radio
                                            // onChange={(e) => handleFilters(e, price.array)}
                                            value={price.array}
                                            name={price.name}
                                        >
                                            {price.name}
                                        </Radio>
                                    </div>
                                )
                            })}
                        </Radio.Group>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>Clear Filters</button>
                    </div>
                </div>
                {/* <div className='d-flex justify-content-center'>
                    <h3 className='text-center'>Sort By Price</h3>
                    <select className="form-select" aria-label="Default select example">
                        <option value="1">Ascending</option>
                        <option value="2">Descending</option>
                    </select>
                </div> */}
                <div className='col-md-9'>
                    <h1>Products</h1>
                    <div className='d-flex flex-wrap' style={{ alignItems: "baseline", alignContent: "space-between" }}>
                        {products.map((product, index) => {
                            return (
                                <div key={index} className='card m-2' style={{ width: '18rem', height: " 29rem", border: "none" }}>
                                    <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`} alt={product.name}
                                        className='p-3' style={{ width: "18rem", borderRadius: "32px" }} />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ fontWeight: "bolder" }}>{product.name}</h5>
                                        <p className="card-text" style={{ fontWeight: "italic" }}>{product.description.substring(0, 20)}.....</p>
                                        <p className="card-text" style={{ fontWeight: "bolder" }}>Price: {product.price}</p>
                                        <button onClick={() => navigate(`/product/${product.slug}`)} className="btn btn-danger view-detail-btn  ms-1">View Details</button>
                                        <button className="btn btn-primary ms-1 add-to-cart-btn"
                                            onClick={() => {
                                                setCart([...cart, product])
                                                localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                                toast.success('Product added to cart')
                                            }}>Add to cart</button>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>

                <div className='d-flex justify-content-center'>
                    {products && products.length < total && (
                        <button onClick={(e) => { e.preventDefault(); loadMore() }} className="m-3 btn btn-primary" >
                            Load more
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Homepage
