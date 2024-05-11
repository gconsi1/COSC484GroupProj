import React, { useState } from 'react';


const PostPage = ({ addPost }) => {
    const [postContent, setPostContent] = useState('');

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
                    if (data.success === true) {
                        addPost(postContent, data.post.userId);
                        setPostContent('');
                    } else {
                        console.error('Failed to create post:', data.error);
                    }
                }).catch(error => {
                    console.error('Error creating post:', error);
                });
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            alert('Post content cannot be empty');
        }
    }
    
    
    return (
        <div className="container">
            <section id="createPost">
                <h2 className="newPost">Create New Post</h2>
                <form id="createPostForm" onSubmit={handleCreatePost}>
                    <div className="form-content">
                        <textarea className="form-control" id="postContent" placeholder="Create post here" value={postContent} onChange={(e) => setPostContent(e.target.value)} required>
                        </textarea>
                    </div>
                    <button type="submit">Post</button>
                </form>
            </section>
        </div>
    );
};
export default PostPage;
