/* import AppRoutes from './AppRoutes' */

import "./features/auth/shared/global.scss"

import { RouterProvider } from "react-router-dom"
import { router } from "./AppRoutes.jsx"

import { AuthProvider } from "./features/auth/auth.context.jsx"


const App = () => {
  return (
    <AuthProvider>
      {/* <AppRoutes /> */}
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
