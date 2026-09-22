import React, { useState, useEffect } from 'react'
import axios from 'axios'

function feed() {
    const [posts, setPosts] = useState([])
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
                    posts.map(post => (     // "post" is the parameter representing each individual post in the "posts" array. It is used to access the properties of each post, such as "_id", "image", and "caption", when rendering the JSX for each post in the feed.
                        <div key={post._id} className="post-card">
                            <img src={post.image} alt="Post" />
                            <div className="post-card-footer">
                                <div className="post-info">
                                    <p className="post-caption">{post.caption}</p>
                                    <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                                <button className="delete-button" onClick={() => {
                                    // detete prompt:
                                    if (window.confirm('Are you sure you want to delete this post?')) {
                                        axios.delete(`http://localhost:3000/posts/${post._id}`)
                                            .then(response => {
                                                console.log(response.data);
                                                setPosts(posts.filter(p => p._id !== post._id));
                                            })
                                            .catch(error => {
                                                console.error('Error deleting post:', error);
                                            })
                                    } else {
                                        console.log('Post deletion canceled');
                                    }
                                }}><i className="fa-solid fa-trash"></i></button>
                            </div>
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