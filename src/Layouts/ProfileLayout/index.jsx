import React from 'react'
import Header from '../MainLayout/Header'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
    return (
        <React.Fragment>
            <main className='layout-section'>
                    <div className='dashboard-header'>
                        <Header />
                    </div>

                    <div className='dashboard-content'>
                        <Outlet />
                    </div>
            </main>
        </React.Fragment>
    )
}

export default ProfileLayout