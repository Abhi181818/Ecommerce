import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div className='text-center'>
            <div className="list-group" >
                <NavLink className="list-group-item" to="/dashboard/user" style={{ textTransform: "uppercase", fontWeight: "bolder" }}>Dashboard</NavLink >
                <NavLink className="list-group-item" to="/dashboard/user/profile">Profile</NavLink>
                <NavLink className="list-group-item" to="/dashboard/user/orders">Orders</NavLink>
                
            </div>
        </div>
    )
}

export default UserMenu
