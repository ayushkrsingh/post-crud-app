import React, {useState, useEffect} from 'react'
import axios from 'axios'

function feed() {
    const [posts, setPosts] = useState([
        {
            _id: 1,
            image: 'https://ik.imagekit.io/thatoneimg/image_qN1Z7eOGz.jpg',
            caption: 'Cyberpunkkkkk'
        },
        {
            _id: 2,
            image: 'https://ik.imagekit.io/thatoneimg/image_qN1Z7eOGz.jpg',
            caption: 'Cyberpunkkkkk'
        }
    ])
    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then(response => {
                setPosts(response.data.posts)
            })
            .catch(error => {
                console.error('Error fetching posts:', error)
            })
    }, [])
  return (
    <section className="feed-section">
        <h1>Feed</h1>
        {
            posts.length > 0 ? (
                posts.map(post => (
                    <div key={post._id} className="post-card">
                        <img src={post.image} alt="Post" />
                        <p>{post.caption}</p>
                    </div>
                ))
            ) : (
                <p>No posts available</p>
            )
        }
    </section>
  )
}

export default feed