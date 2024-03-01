import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../Context/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../Hooks/useCategory'
import { useCart } from '../../Context/cart'
import { Badge } from 'antd'
const Header = () => {
  const [cart, setCart] = useCart()
  const category = useCategory()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const handleLogout = async (e) => {
    e.preventDefault()
    setAuth({ user: null, token: "" })
    localStorage.removeItem("auth")
    toast.dark("Logged out successfully")
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  }
  const img_1 = "https://img.icons8.com/ios/50/000000/shopping-cart.png"
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={img_1} height="35px" /> E-Commerce
            </Link>
            {/* <SearchInput /> */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="dropdown nav-item">
                <Link className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  to="/category"
                >
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/category">All</NavLink>
                  </li>
                  {category.map((c) => (
                    <li key={c._id}><NavLink className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</NavLink></li>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li></>
              ) : (
                <>
                  {/* <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" role='button'>{auth?.user?.name}</NavLink>
                    <ul className='dropdown-menu'>
                      <li>
                        <NavLink to="/dashboard" className="dropdown-item">Dashboard</NavLink>
                      </li>
                      <li>
                        <NavLink onClick={handleLogout} className="nav-link dropdown-item" to="/logout">Logout</NavLink>
                      </li> 
                    </ul>
                  </li> */}
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle"
                      role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </Link>
                    <ul className="dropdown-menu profile-menu">
                      <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink></li>
                      <li>
                        <NavLink onClick={handleLogout} className="dropdown-item" to="/logout">Logout</NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Badge count={cart.length} showZero>
                  <NavLink className="nav-link" to="/cart">
                    <img src="https://img.icons8.com/ios/50/000000/shopping-cart.png" height="15px" alt="cart" />
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
