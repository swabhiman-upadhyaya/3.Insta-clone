import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/Post.jsx'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/Nav.jsx'


const Feed = () => {

  const { loading, handleGetFeed, feed } = usePost();

  useEffect(() => {
    handleGetFeed()
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading</h1>
      </main>
    )
  }

  return (
    <main className='feed-page'>

      <section className="feed">

        <div className="posts">
          {feed.map((post, idx) => {
            return (
              <Post user={post.user} post={post} key={idx} />
            )
          })}
        </div>

        <div className="nav-bar">
          <Nav />
        </div>
      </section>

    </main>
  )
}

export default Feed