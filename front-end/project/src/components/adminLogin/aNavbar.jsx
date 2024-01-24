import React from 'react'
import './alogin.css'
import LockOutlined from '@mui/icons-material/LockOutlined'
function Navbar() {
  return (
    <div className='nav'>
        
        <span  className='header'>Admin Login <LockOutlined sx={{maxHeight:'25rem'}}></LockOutlined></span>
    </div>
  )
}

export default Navbar
