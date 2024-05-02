import React from 'react';

const PostPage = () => {

    const handleCreatePost = (event) => {
        event.preventDefault(); // Prevent the default form submission
    }
    
    return (
        <div className="container">
                <div className="forum-feed">
                    <button className="new-post-button" onClick={handleCreatePost}>
                        New post
                    </button>
                </div>
                <section className="post-list">
                    <h2 className="section-title">Latest Posts</h2>
                    <div className="post">
                        <p className="post-content">Content goes here</p>
                    </div>
                </section>
                <section id="createPost">
                    <h2 className="section-title">Create New Post</h2>
                    <form id="createPostForm" onSubmit={handleCreatePost}>
                        <div className="form-group">
                            <textarea className="form-control" id="postContent" placeholder="Enter post content" required></textarea>
                        </div>
                        <button type="submit">Create Post</button>
                    </form>
                </section>
        </div>
    );
};
export default PostPage