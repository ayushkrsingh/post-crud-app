import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const CreatePost = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData(e.target);
    axios.post('http://localhost:3000/create-post', formData)
      .then(() => {
        navigate('/feed');
      })
      .catch(error => {
        console.error('Error creating post:', error);
        setIsSubmitting(false);
      });
  }
  return (
    <section className="create-post-section">
      <h1>Create a New Post</h1>
      <form action="http://localhost:3000/create-post" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="file" name="image" accept="image/*" required />
        <input type="text" name="caption" placeholder="Enter caption: " required />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </section>
  )
}

export default CreatePost