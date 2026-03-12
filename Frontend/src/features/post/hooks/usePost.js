import { createPost, getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context.jsx";
import { useEffect } from "react";

export const usePost = () => {

  const context = useContext(PostContext);

  const { loading, setLoading, post, feed, setFeed } = context

  async function handleGetFeed() {
    try {
      setLoading(true)
      const data = await getFeed();
      setFeed(data.posts)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  async function handleCreatePost(imgFile, caption) {
    setLoading(true)
    const data = await createPost(imgFile, caption);
    console.log(data)
    setFeed(data.posts, ...feed)
    setLoading(false)
  }

  useEffect(() => {
    handleGetFeed();
  }, [])

  return { loading, feed, post, handleGetFeed, handleCreatePost }
}
