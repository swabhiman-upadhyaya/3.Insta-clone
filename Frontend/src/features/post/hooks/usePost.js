import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context.jsx";

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

  return { loading, feed, post, handleGetFeed }
}
