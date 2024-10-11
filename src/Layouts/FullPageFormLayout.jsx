import '../Pages/Login/index.scss'
import { Outlet } from 'react-router-dom'

const FullPageFormLayout = () => {
  console.log('layouttttttttttttttttttt')
  return (
        <main className="login-section">
        <div className="login-form">
            <Outlet />
        </div>
        </main>
  )
}

export default FullPageFormLayout