import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/auth.css'
import './styles/app.css'
import App from './App.jsx'
import AuthProvider from './components/AuthProvider'
import RouterProvider from './components/RouterProvider'

createRoot(document.getElementById('root')).render(
  <RouterProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </RouterProvider>
)
