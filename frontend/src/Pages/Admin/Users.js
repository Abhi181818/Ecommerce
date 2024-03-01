import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'

const Users = () => {
    return (
        <Layout title="Users">
            <div className='container m-3 p-3' >
                <div className='row'>
                    <div className='col-md-3 '>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 '>
                        <div className='card m-3 p-3'>
                            <h1>Users</h1>
                            <div className='card-header'>All User Details</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users
