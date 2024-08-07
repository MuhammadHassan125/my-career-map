import { BrowserRouter } from "react-router-dom"
import Layout from "./Layouts/MainLayout"
import Router from "./Components/Router"

function App() {

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
