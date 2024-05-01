import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import './frontEndCSSv2.css'; // Import your CSS file

const App = () => {
    const handleCreatePost = (event) => {
        event.preventDefault(); // Prevent the default form submission
        
        // Logic for creating a new post
    };
    return (
        <Router>
            <div className="webpage">
                <header className="webpage-header">
                    <div className="webpage-header-logo">
                        <div className="logo">
                            <span className="logo-icon">
                                <img id="ProLinkLogo" src="prolinkdesign.png" alt="ProLink Logo" />
                            </span>
                            <h1 className="ProLink-name">
                                <span>ProLink</span>
                            </h1>
                        </div>
                    </div>
                    <div className="header-navigation">
                        <div className="search-bar">
                            <input type="text" placeholder="Search" />
                            <button className="search-button">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="user-settings">
                        <div className="wrapper">
                            <form id="loginForm">
                                <h1>Login</h1>
                                <div className="input-box">
                                    <input type="text" placeholder="Username" required />
                                </div>
                                <div className="input-box">
                                    <input type="password" placeholder="Password" required />
                                </div>
                                <div className="remember">
                                    <label><input type="checkbox" />Remember me</label>
                                </div>
                                <button type="submit" className="loginButton">Login</button>
                            </form>
                        </div>
                    </div>
                    <div className="user-settings-buttons">
                        <Link to="/notifications" className="notification-button">
                            Notifications
                        </Link>
                        <Link to="/messages" className="messages-button">
                            Messages
                        </Link>
                        <Link to="/profile" className="settings-button">
                            Profile
                        </Link>
                    </div>
                </header>
                <div className="container">
                    <Routes>
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
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
            </div>
        </Router>
    );
};

export default App;