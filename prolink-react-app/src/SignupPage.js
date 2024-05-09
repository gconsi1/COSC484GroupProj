import React, {useState} from "react";

const SignupPage = () =>{

    // Logic for sending login data to backend
        //handle sending login data
        const[userId, setUserId]=useState('');
        const[password, setPassword]=useState('');
        const[email, setEmail]=useState('');

    
        function handleSignup(event){
            event.preventDefault();
            event.target.reset();
            console.log('clicked');
    
            let userData = {
                userId:userId,
                password:password,
                email:email
            }
    
            fetch("/api/signup", {
                method: "post",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
    
            }).then(response=>response.json()).then(data=>{
                console.log(data);
            })
        }

    return(
        <div className="wrapper">
            <form id="loginForm" onSubmit={handleSignup}>
            <h1>Sign up here</h1>
            <div className="input-box">
                <input type="text" placeholder="Username" onChange={e=>setUserId(e.target.value)}
                required />
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}
                required />
            </div>
            <div className="input-box">
                <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}
                required />
            </div>
            <div className="remember">
                <label><input type="checkbox" />Remember me</label>
            </div>
            <button type="submit" className="loginButton">Sign up</button>
        </form>
        </div>
    )
}

export default SignupPage;