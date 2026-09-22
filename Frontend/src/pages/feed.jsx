import React, { useState, useEffect } from 'react'
import axios from 'axios'

function feed() {
    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then(response => {
                setPosts(response.data.posts)
            })
            .catch(error => {
                console.error('Error fetching posts:', error)
            })
    }, [])

    useEffect(() => {
        const closeOnEscape = event => {
            if (event.key === 'Escape') {
                setSelectedPost(null)
            }
        }

        window.addEventListener('keydown', closeOnEscape)
        return () => window.removeEventListener('keydown', closeOnEscape)
    }, [])

    return (
        <>
        <section className="feed-section">
            <div className="feed-header">
                <h1>Feed</h1>
                <a href="/create-post" className="create-post-link">Create Post</a>
            </div>
            {
                posts.length > 0 ? (
                    posts.map(post => (     // "post" is the parameter representing each individual post in the "posts" array. It is used to access the properties of each post, such as "_id", "image", and "caption", when rendering the JSX for each post in the feed.
                        <div key={post._id} className="post-card">
                            <button
                                className="post-image-button"
                                type="button"
                                onClick={() => setSelectedPost(post)}
                                aria-label={`View post: ${post.caption}`}
                            >
                                <img src={post.image} alt={post.caption || 'Post'} />
                            </button>
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
        {selectedPost && (
            <div
                className="post-modal-overlay"
                role="presentation"
                onClick={() => setSelectedPost(null)}
            >
                <div
                    className="post-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Expanded post"
                    onClick={event => event.stopPropagation()}
                >
                    <button
                        className="post-modal-close"
                        type="button"
                        onClick={() => setSelectedPost(null)}
                        aria-label="Close expanded post"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <img src={selectedPost.image} alt={selectedPost.caption || 'Post'} />
                    {selectedPost.caption && <p>{selectedPost.caption}</p>}
                    <span>{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        )}
        </>
    )
}

export default feed