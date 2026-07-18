import { ContextProvider } from './context/ContextProvider.jsx'
import { RoutesApp } from './routes/RoutesApp.jsx'

function App() {

  return (
    <ContextProvider>
      <RoutesApp />
    </ContextProvider>
  )
}

export default App
