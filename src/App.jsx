import { BrowserRouter } from "react-router-dom"
import Router from "./Components/Router"
import ErrorDialogueProvider from "./Providers/ErrorDialogueProvider"

function App() {

  return (
    <ErrorDialogueProvider >
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    </ErrorDialogueProvider>
  )
}

export default App
