require("dotenv").config({path: "./config.env"});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const { type } = require("os");
const {createTokens, validateTokens} = require('./JWT');

const app = express();
app.use(bodyParser.json());
app.listen(5000, () =>console.log('server running on port 5000'));
app.use(bodyParser.json());

//get login data to databse
try {
mongoose.connect('mongodb+srv://jaymehta0113:prolink484@prolinkcluster.wkozyum.mongodb.net/prolink?retryWrites=true&w=majority&appName=ProlinkCluster');


const db = 'prolink';

//list of collections in database
const userData = 'user-data';
const postData = 'post-data';

//sign up schema
const signupSchema = new mongoose.Schema({
    userId: String,
    password: String,
    email: String
})
const signup = mongoose.model('signup', signupSchema, userData)

//login schema
const loginSchema = new mongoose.Schema({
    userId: String,
    password: String
})
const login = mongoose.model('login', loginSchema, userData)

//post schema
const postSchema = new mongoose.Schema({
    userId: String,
    content: String,
    dateCreated: {type: Date, default: Date.now}
});
const post = mongoose.model('post', postSchema, postData);

// endpoint for creating posts
app.post("/api/post", async (req, res) => {
    const { userId, content } = req.body;

    try {
        const newPost = await post.create({ userId, content }); // Store userId
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

// Endpoint for retrieving all posts
app.get("/api/post", async (req, res) => {
    try {
        const allPosts = await post.find();
        res.status(200).json(allPosts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});


// endpoint for retrieving posts for a specific user
app.get("/api/post/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const userPosts = await post.find({ userId }); // Fetch posts for specific userId
        res.status(200).json(userPosts);
    } catch (error) {
        console.error('Error retrieving posts: ', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});


//post methods to handle backend operations
app.post("/api/signup", async (req, res)=>{
    console.log(req.body);

    const{userId, password, email} = req.body;

    const tempUser = await signup.findOne({userId});
    const tempEmail = await signup.findOne({email});

    try {
        // Create a new user document and save it to the database

        if(!tempUser && !tempEmail){
        const newUser = await signup.create({ userId, password, email });
        res.status(201).json({ message: 'User created successfully', user: newUser });
        }
        else{
            res.status(404).json({message: 'user/email already exists'});
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
    
})


app.post("/api/login", async (req, res) =>{
    const{userId, password} = req.body;

    const tryLogin = await login.findOne({userId});

    if(!tryLogin){
        res.status(401).json({success: false, message: 'Username not found'});
    }
    else if(tryLogin.password != password){
        res.status(401).json({success: false, message: 'password incorrect'})
    }
    else{
        const getEmail = await signup.findOne({userId})
        const token = createTokens(getEmail);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({message: 'Login completed', 
        success: true, 
        token: token, 
        userId: userId, 
        email: getEmail.email})
    }

})

app.get('/api/user-auth', validateTokens, (req, res)=>{
    res.json({ success: true, message: 'User is authenticated' });
})
}

catch(error){
    console.log('error connecting to database');
}

