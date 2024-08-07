import { useMemo } from "react"
import { Navigate, Outlet } from "react-router-dom"

const GuestRoute = () => {
    const userVisitedDashboard = useMemo(() => localStorage.getItem('user-visited-dashboard'), [])
    return (
        userVisitedDashboard ? <Navigate to='/' /> : <Outlet />
    )
}

export default GuestRoute