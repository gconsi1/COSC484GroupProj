import React, {useState} from "react";
import { Link } from 'react-router-dom';

const LoginPage = () =>{

    // Logic for sending login data to backend
        //handle sending login data
        const[userId, setUserId]=useState('');
        const[password, setPassword]=useState('');
    
        function handleLogin(event){
            event.preventDefault();
            event.target.reset();
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
                setUserId(data.userId);
                console.log(data);
                if (data.success === true) {
                    const token = data.token;
                    const userId = data.userId;
                    
                    // Save userId to localStorage if needed
                    localStorage.setItem('jwt', token);
                    
                    // Update userId state in App.js
                    setUserId(userId);
                }
            })
        }

    return(
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
                <button className="to-signup"><Link to="/signup" className='signup-button'>
                            Sign up instead
                        </Link></button>
            </form>
            </div>
    )
}

export default LoginPage;