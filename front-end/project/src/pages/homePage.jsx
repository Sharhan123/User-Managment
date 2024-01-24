import React, { useEffect } from 'react'
import Home from '../components/Home/home'
import Navbar from '../components/Home/navbar'
import Footer from '../components/Home/footer'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function HomePage() {
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token);  
    return (
    <>
      <Navbar />
      <Home  />
      < Footer />
      </>
  )
}

export default HomePage
