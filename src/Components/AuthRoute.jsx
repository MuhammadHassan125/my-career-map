import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
    const userVisitedDashboard = useMemo(() => localStorage.getItem('user-visited-dashboard'), []);
    return (
        userVisitedDashboard ? <Outlet /> : <Navigate to='/login' />
    )
}

export default AuthRoute