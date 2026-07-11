import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css';
import App from './App.jsx'
import { router } from './routes/router.jsx';
import { RouterProvider } from 'react-router-dom';
import AppContextProvider from './contexts/AppContext.jsx';





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>,
)
