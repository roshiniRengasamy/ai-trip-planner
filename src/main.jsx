import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateTrip from './create-trip/index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/custom/header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]'
import MyTrip from './my-trip'
import WithHeader from './components/custom/withHeader'

const WithHeaderApp = WithHeader(App)
const WithHeaderCreateTrip = WithHeader(CreateTrip)
const WithHeaderViewTrip = WithHeader(ViewTrip)
const WithHeaderMyTrip = WithHeader(MyTrip)

const router = createBrowserRouter([
  {
    path: "/",
    element: <WithHeaderApp />
  },
  {
    path: "/create-trip",
    element: <WithHeaderCreateTrip />
  },
  {
    path: '/view-trip/:tripId',
    element: <WithHeaderViewTrip />
  },
  {
    path: '/my-trip',
    element: <WithHeaderMyTrip />
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Toaster />
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
  // </StrictMode>,
)
