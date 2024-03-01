import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useAuth } from '../../Context/auth'

const AdminDashboard = () => {
    const [auth] = useAuth()
    return (
        <Layout title="AdminMenu">
            <div className='container m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card m-3 p-3'>
                            <h1>Admin Details</h1>
                            <div className='card-header'>Admin ID: {auth?.user?._id}</div>
                            <div className='card-header'>Admin Name: {auth?.user?.name}</div>
                            <div className='card-header'>Admin Email: {auth?.user?.email}</div>
                            <div className='card-header'>Admin Phone: {auth?.user?.phone}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
