import React from 'react'
import "../style/createpost.scss"
import { useState, useRef } from 'react'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {

  const [caption, setCaption] = useState("")
  const postImageInputFileRef = useRef(null)

  const { handleCreatePost, loading } = usePost()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imgFile = postImageInputFileRef.current.files[0]

    await handleCreatePost(imgFile, caption);

    navigate("/feed");

  }

  if (loading) {
    return (
      <main>
        <h1>Loading</h1>
      </main>
    )
  }

  return (
    <main>
      <div className="create-post-page">
        <div className="form-container">
          <h1>Create Post</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="postImage">Select Image</label>
            <input ref={postImageInputFileRef}
              hidden type="file" id='postImage' name='postImage' />
            <input value={caption} onChange={(e) => {
              setCaption(e.target.value)
            }}
              type="text" id='caption' name='caption' placeholder='Enter Caption' />
            <button className='button primary-button'>Create Post</button>
          </form>

        </div>
      </div>
    </main>
  )
}

export default CreatePost