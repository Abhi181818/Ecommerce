import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const CategoryWiseProducts = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
    const getProdByCategory = async (slug) => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-category/${params.slug}`)
        setProducts(data.products)
        setCategory(data.category)
    }
    useEffect(() => {
        getProdByCategory(params.slug)
    })
    return (
        <Layout>
            <div className='container mb-5'>
                {category && <h2 className='text-center mt-3'>{category.name}</h2>}
                <div>
                    <div className='d-flex flex-wrap' style={{ alignItems: "baseline", alignContent: "space-between" }}>
                        {products.map((product, index) => {
                            return (
                                <div key={index} className='card m-2' style={{ width: '18rem', height: " 29rem", border: "none" }}>
                                    <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`} alt={product.name}
                                        className='p-3' style={{ width: "18rem", borderRadius: "32px"}} />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ fontWeight: "bolder" }}>{product.name}</h5>
                                        <p className="card-text" style={{ fontWeight: "italic" }}>{product.description.substring(0, 20)}.....</p>
                                        <p className="card-text" style={{ fontWeight: "bolder" }}>Price: {product.price}</p>
                                        <button onClick={() => navigate(`/product/${product.slug}`)} className="btn btn-danger view-detail-btn  ms-1">View Details</button>
                                        <button className="btn btn-primary ms-1 add-to-cart-btn">Add to cart</button>
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

export default CategoryWiseProducts
