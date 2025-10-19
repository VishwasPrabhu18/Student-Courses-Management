import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { UserDataProvider } from './context/UserDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <UserDataProvider>
      <App />
    </UserDataProvider>
  </UserProvider>
)
