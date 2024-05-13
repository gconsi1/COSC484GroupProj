import React, {useState} from "react";
import { Link } from 'react-router-dom';

const LoginPage = () =>{

    // Logic for sending login data to backend
        //handle sending login data
        const[userId, setUserId]=useState('');
        const[password, setPassword]=useState('');
    
        function handleLogin(event) {
            event.preventDefault();
            event.target.reset();
            console.log('clicked');
        
            let userData = {
                userId: userId,
                password: password
            }
        
            fetch("/api/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }).then(response => response.json()).then(data => {
                console.log('Login response:', data);
                if (data.success === true) {
                    const token = data.token;
                    const userId = data.userId;
                    
                    // Save userId to localStorage if needed
                    localStorage.setItem('jwt', token);
                    console.log('Token saved to localStorage:', token);
                    
                    // Update userId state in App.js
                    setUserId(userId);
                } else {
                    console.error('Login failed:', data.error);
                }
            }).catch(error => {
                console.error('Error during login:', error);
            });
        }        
        
        const inputStyle = {
            width: '100%', 
            padding: '15px',
            margin: '8px 0',
            display: 'inline-block',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontSize: '16px'
        };
    return(
        <div className="wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0, backgroundColor: '#f4f4f4', fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                <form id="loginForm" onSubmit={handleLogin}style={{ width: '80%', maxWidth: '600px', padding: '2em', backgroundColor: 'white', boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)', borderRadius: '10px' }}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" onChange={e=>setUserId(e.target.value)}
                    required style={inputStyle} />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}
                    required style={inputStyle} />
                </div>
                <div className="remember">
                    <label><input type="checkbox" />Remember me</label>
                </div>
                <button type="submit" className="loginButton"style={{width: '100%', padding: '15px', backgroundColor: '#72a98b', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1em' }}>Login</button>
                <button className="to-signup" style ={{alignItems: 'center'}}><Link to="/signup" className='signup-button'>
                            Sign up instead
                        </Link></button>
            </form>
            </div>
    )
}

export default LoginPage;