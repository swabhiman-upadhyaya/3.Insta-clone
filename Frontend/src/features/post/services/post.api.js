import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
})

export const getFeed = async () => {

  const resposnse = await api.get("/post/feed")
  return resposnse.data
}

export const createPost = async (imgFile, caption) => {

  const formData = new FormData();

  formData.append("image", imgFile);
  formData.append("caption", caption);

  const resposnse = await api.post("/post", formData)

  return resposnse.data
}