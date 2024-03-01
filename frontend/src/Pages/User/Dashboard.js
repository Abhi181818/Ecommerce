import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Context/auth'

const Dashboard = () => {
    const [auth] = useAuth()
    return (
        <Layout title="UserMenu">
            <div className='container m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card m-3 p-3'>
                            <h1>User Details</h1>
                            {/* <div className='card-header'>User ID: {auth?.user?._id}</div> */}
                            <div className='card-header'>Name: {auth?.user?.name}</div>
                            <div className='card-header'>Email: {auth?.user?.email}</div>
                            {/* <div className='card-header'>User Phone: {auth?.user?.phone}</div> */}
                            {/* <div className='card-header'>User Address:{auth?.user?.address}</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
