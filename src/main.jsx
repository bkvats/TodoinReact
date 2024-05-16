import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Home, Login, Recents, Signup, Todos, ViewAndEditTodo} from "./components"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element = {<App />}>
      <Route path="" element = {<Home />} />
      <Route path="login" element = {<Login />} />
      <Route path="signup" element = {<Signup />} />
      <Route path="todos" element = {<Todos />}>
        <Route path="view/:id/:edit/:divOneHeight" element = {<ViewAndEditTodo />} />
      </Route>
      <Route path="recents" element={<Recents />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
