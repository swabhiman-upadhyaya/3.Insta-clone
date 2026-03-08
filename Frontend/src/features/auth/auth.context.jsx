/* State layer */

import { createContext, useState } from "react";
import { login, register } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (username, password) => {

    setLoading(true);
    try {
      /* calling "login" api */
      const response = await login(username, password)

      
      /* storing the whole "user" object to "user(context)" which we're giving in response from the backend */
      setUser(response.user)
      
      return response.user
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  const handleRegister = async (username, email, password) => {

    setLoading(true)

    try {
      const response = await register(username, email, password);
      setUser(response.user)
    }
    catch (err) {
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister }}>
      {children}
    </AuthContext.Provider>
  )
}