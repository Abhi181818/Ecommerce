import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
const Layout = ({ children, title, description }) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "79vh" }}>
                <ToastContainer position='top-center' autoClose={3000} theme='dark'/>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
