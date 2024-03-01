import React, { useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import useCategory from '../Hooks/useCategory'
import { Link } from 'react-router-dom'
const Categories = () => {
    const categories = useCategory()

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    {categories.map((category) => (
                        <div key={category._id} className='col-md-2 mt-5'>
                            <Link className='btn btn-primary' to={`/category/${category.slug}`}>{category.name}</Link>
                        </div>
                    ))}

                </div>
            </div>
        </Layout>
    )
}

export default Categories
