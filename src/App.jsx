import Router from "./Components/Router"
import { Provider } from "point-fetch-react"
import useErrorDialogs from "./Hooks/useErrorDialogs";
import { baseURL } from "./Utils/contants";

function App() {
  const {handleOpenUnAuthorizeModal, handleOpenInternalServer} = useErrorDialogs();
  return (
    <Provider
      baseURL={baseURL}
      authorization={`Bearer ${localStorage.getItem('user-visited-dashboard')}`}
      onUnAuthenticated={handleOpenUnAuthorizeModal}
      onServerError={handleOpenInternalServer}
    >
          <Router />
    </Provider>
  )
}

export default App
 