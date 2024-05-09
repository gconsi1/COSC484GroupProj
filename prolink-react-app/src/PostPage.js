import React, { useState } from 'react';

const PostPage = ({addPost}) => {

    const [postContent, setPostContent] = useState('');

    const handleCreatePost = (event) => {
        event.preventDefault(); // Prevent the default form submission
        if(postContent.trim() !== '') {
            console.log('Post created with: ', postContent);
            addPost(postContent);
            setPostContent('');
        } else {
            alert('Post not created');
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