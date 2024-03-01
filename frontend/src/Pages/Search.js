import React from 'react'
import Layout from '../Components/Layout/Layout.js'
import { useSearch } from '../Context/Search.js'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/cart.js'
import { toast } from 'react-toastify'

const Search = () => {
    const [cart, setCart] = useCart()
    const navigate = useNavigate()
    const [value] = useSearch('')
    const { products } = value.results
    return (
        <Layout title="Search Result">
            <div className="container mt-2">
                <div className='text-center'>
                    <h1>Search Result</h1>
                    <h4>{`${value.results.length}` < 1 ? "No prods found" : `Found ${value.results.products.length} products`}</h4>
                </div>
                <div className=''>
                    <div className='d-flex flex-wrap' style={{ alignItems: "baseline", alignContent: "space-between" }}>
                        {products?.map((product, index) => {
                            return (
                                <div key={index} className='card m-2' style={{ width: '18rem', height: " 29rem", border: "none" }}>
                                    <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`} alt={product.name}
                                        className='p-3' />
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
            </div>
        </Layout>
    )
}

export default Search
