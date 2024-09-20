import React from 'react'
import '../Pages/Login/index.scss'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
        <main className="login-section">
        <div className="login-form">
            <Outlet />
        </div>
        </main>
  )
}

export default AuthLayout