import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Home, Login, Signup} from "./components"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element = {<App />}>
      <Route path="" element = {<Home />} />
      <Route path="login" element = {<Login />} />
      <Route path="signup" element = {<Signup />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
