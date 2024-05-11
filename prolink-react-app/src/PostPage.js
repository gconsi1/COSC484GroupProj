import React, { useState } from 'react';

const PostPage = ({addPost, userId}) => {

    const [postContent, setPostContent] = useState('');

    const handleCreatePost = async (event) => {
        event.preventDefault();
        if (postContent.trim() !== '') {
            try {
                const response = await fetch("/api/post", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userId, content: postContent })
                });
                const data = await response.json();
                if (response.ok) {
                    addPost(postContent, data.post.userId); // Use userId from the response data
                    setPostContent('');
                } else {
                    console.error('Failed to create post:', data.error);
                }
            } catch (error) {
                console.error('Error creating post:', error);
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
export default PostPage