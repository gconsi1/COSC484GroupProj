import React, { useState } from 'react';

const PostPage = ({ addPost }) => {
    const [postContent, setPostContent] = useState('');
    const [notification, setNotification] = useState('');

    function handleCreatePost(event) {
        event.preventDefault();
        if (postContent.trim() !== '') {
            try {
                // Decode the token to get user information
                const token = localStorage.getItem('jwt');
                const tokenPayload = token.split('.')[1]; // Get the payload part of the token
                const decodedPayload = atob(tokenPayload); // Decode base64 encoded payload
                const parsedPayload = JSON.parse(decodedPayload); // Parse JSON from decoded payload
                const userId = parsedPayload.userId;
    
                fetch("/api/post", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userId, content: postContent })
                }).then(response => response.json()).then(data => {
                    if (data.message === 'Post created successfully') {
                        addPost(postContent, data.post.userId);
                        setPostContent('');
                        setNotification('Your post was successfully created!');
                        setTimeout(() => setNotification(''), 3000); // Remove notification after 3 seconds
                    } else {
                        console.error('Failed to create post:', data.error);
                        setNotification('Failed to create post.');
                    }
                }).catch(error => {
                    console.error('Error creating post:', error);
                    setNotification('Error creating post.');
                });
            } catch (error) {
                console.error('Error decoding token:', error);
                setNotification('Error decoding token.');
            }
        } else {
            alert('Post content cannot be empty');
        }
    }
    
    
    return (
        <div className="post-page">
            <form onSubmit={handleCreatePost} className="post-form">
                <h2>Create New Post</h2>
                <textarea
                    className="post-input"
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    required
                />
                <button type="submit" className="submit-post">Post</button>
                {notification && <div className="notification">{notification}</div>}
            </form>
        </div>
    );
};

export default PostPage;