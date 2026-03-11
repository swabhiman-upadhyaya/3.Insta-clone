/* 
import { Routes, Route } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from './features/auth/pages/Register';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<h1>Welcome to our App</h1>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
  )
}

export default AppRoutes */

import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"

import Feed from "./features/post/pages/Feed.jsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])