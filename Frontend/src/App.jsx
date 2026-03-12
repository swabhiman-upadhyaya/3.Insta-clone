/* import AppRoutes from './AppRoutes' */

import "./features/shared/global.scss"

import { RouterProvider } from "react-router-dom"
import { router } from "./AppRoutes.jsx"

import { AuthProvider } from "./features/auth/auth.context.jsx"
import { PostContextProvider } from './features/post/post.context.jsx';


const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App