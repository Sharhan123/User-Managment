import React from 'react'
import './login.css'
import LockOutlined from '@mui/icons-material/LockOutlined'
function Navbar() {
  return (
    <div className='nav'>
        
        <span  className='header'>Login Here <LockOutlined sx={{maxHeight:'25rem'}}></LockOutlined></span>
    </div>
  )
}

export default Navbar
