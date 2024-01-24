import React from 'react'
import LockOutlined from '@mui/icons-material/LockOutlined'
function Navbar() {
  return (
    <div className='nav'>
        
        <span  className='header'>Register Here<LockOutlined sx={{maxHeight:'25rem'}}></LockOutlined></span>
    </div>
  )
}

export default Navbar
