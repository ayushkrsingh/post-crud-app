import React from 'react'

const CreatePost = () => {
  return (
    <section className="create-post-section">
      <h1>Create a New Post</h1>
      <form action="http://localhost:3000/create-post" method="POST" encType="multipart/form-data">
        <input type="file" name="image" accept="image/*" />
        <input type="text" name="caption" placeholder="Enter caption: " required />
        <button type="submit">Create Post</button>
      </form>
    </section>
  )
}

export default CreatePost