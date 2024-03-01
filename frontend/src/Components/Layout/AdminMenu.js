import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <div className='text-center'>
            <div className="list-group" >
                <NavLink className="list-group-item" to="/dashboard/admin" style={{ textTransform: "uppercase", fontWeight: "bolder" }}>Admin Panel</NavLink >
                <NavLink className="list-group-item" to="/dashboard/admin/create-category">Crate Category</NavLink>
                <NavLink className="list-group-item" to="/dashboard/admin/create-product">Create Product</NavLink>
                <NavLink className="list-group-item" to="/dashboard/admin/products">Products</NavLink>
                <NavLink className="list-group-item" to="/dashboard/admin/users">Users</NavLink>
            </div>
        </div>
    )
}

export default AdminMenu
