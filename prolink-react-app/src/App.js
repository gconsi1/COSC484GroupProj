import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import PostPage from './PostPage';
import SettingsPage from './SettingsPage';
import './frontEndCSSv2.css'; // Import your CSS file

const App = () => {
        // Logic for sending login data to backend
        //handle sending login data
    const[userId, setUserId]=useState('');
    const[password, setPassword]=useState('');

    //useState to manage posts
    const [posts, setPosts] = useState([]);

    function handleLogin(event){
        event.preventDefault();
        console.log('clicked');

        let userData = {
            userId:userId,
            password:password
        }

        fetch("/api/login", {
            method: "post",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)

        }).then(response=>response.json()).then(data=>{
            console.log(data);
        })
    }

    //add a new post to the home page feed
    const addPost = (postContent) => {
        const newPost = {
            id: posts.length + 1,
            content: postContent
        };
        setPosts([...posts, newPost]);
        console.log("New post added:", newPost)
    }
    const Feed = ({ posts }) => {
        return(
            <div className="home">
                <h2>Home Page</h2>
                <div className="post-list">
                    {posts.map(post => (
                        <div key={post.id} className="post">
                            <p className="post-content">{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    return (
        <Router>
            <switch>
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
                            <form id="loginForm" onSubmit={handleLogin}>
                            <h1>Login</h1>
                            <div className="input-box">
                                <input type="text" placeholder="Username" onChange={e=>setUserId(e.target.value)}
                                required />
                            </div>
                            <div className="input-box">
                                <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}
                                required />
                            </div>
                            <div className="remember">
                                <label><input type="checkbox" />Remember me</label>
                            </div>
                            <button type="submit" className="loginButton">Login</button>
                        </form>
                        </div>
                    </div>
                    <div className="user-settings-buttons">
                        <Link to="/" className="home-button">
                            Home
                        </Link>
                        <Link to="/post" className="post-button">
                            Post
                        </Link>
                        <Link to="/profile" className="profile-button">
                            Profile
                        </Link>
                        <Link to="/settings" className="settings-button">
                            Settings
                        </Link>
                        <Link to="/messages" className="messages-button">
                            Messages
                        </Link>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<Feed posts={posts} />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/post" element={<PostPage addPost={addPost}/>} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
                
            </div>
            </switch>
        </Router>
    );
};
export default App;
