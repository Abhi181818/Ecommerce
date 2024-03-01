import React from 'react'
import Layout from '../Components/Layout/Layout'

const Contact = () => {
    return (
        <Layout title="Contact Us">
            <div className='row'>
                <div className='col-md-6 m-5'>
                    <img src='https://media.istockphoto.com/id/1450058572/photo/businessman-using-a-laptop-and-touching-on-virtual-screen-contact-icons-consists-of-telephone.jpg?s=2048x2048&w=is&k=20&c=7KhNOYQ1PAxuAcVxu_YieJo5wvIvBpcw1nkXDJ5YM30=' alt='contact'
                        style={{ width: "100%" }} />
                </div>
                <div className='col-md-4 m-5 '>
                    <h1 className='bg-dark p-2 text-white text-center'>Contact</h1>
                    <div className='p-4'>
                        <p> 📞 : 123-456-7890</p>
                        <p> 📧 : </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
