import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <h4 className='text-center'>Footer &copy; </h4>
      <p className='text-center mt-3'>
        <Link to="/about">About</Link>
        <Link to="/contact" className='ms-3'>Contact</Link>
        <Link to="/policy" className='ms-3'>Policy</Link>
      </p>
    </div>
  )
}

export default Footer
