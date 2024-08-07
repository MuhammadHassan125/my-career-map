import React from 'react'
import './index.scss'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
// import Outlet from 'react-router-dom'
const Layout = () => {
  return (
    <React.Fragment>
      <main className='layout-section'>
        <div className='dashboard-sidebar'>
          <Sidebar />
        </div>

        <div className='dashboard-main'>
          <div className='dashboard-header'>
            <Header />
          </div>

          <div className='dashboard-content'>
            {/* <Outlet/> */}
            <Outlet />
          </div>
        </div>


      </main>
    </React.Fragment>
  )
}

export default Layout