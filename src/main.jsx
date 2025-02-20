import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateTrip from './create-trip/index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip'
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
  // <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
  <GoogleOAuthProvider clientId={"884269672950-0i6lr8ma48i9u90lqso5oi60o0jqasge.apps.googleusercontent.com"}>
    <Toaster />
    < RouterProvider router={router} />
  </GoogleOAuthProvider>
)
