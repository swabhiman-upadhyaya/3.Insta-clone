import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
})

export const getFeed = async () => {

  const resposnse = await api.get("/post/feed")
  return resposnse.data
}