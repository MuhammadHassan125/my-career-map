import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../Layout'
import Login from '../auth/login/index'
import App from '../../App'
const PrivateRoutes = () => {
  return (
    <React.Fragment>
        <BrowserRouter>
            <Routes>
                {/* <Route element={<App/>} axact path='/'/> */}
                {/* <Route path='login' element={<Login/>}/> */}
            </Routes>
        </BrowserRouter>
    </React.Fragment>
  )
}

export default PrivateRoutes