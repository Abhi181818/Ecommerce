import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
    return (
        <Layout title="PageNotFound">
            <div className='pnf'>
                <h1 className='pnf-404'>404! 🙁</h1>
                <p>Sorry, this page does not exist.</p>
                <Link to="/" className='go-back-btn'>Home Page !</Link>
            </div>
        </Layout>
    )
}

export default PageNotFound
