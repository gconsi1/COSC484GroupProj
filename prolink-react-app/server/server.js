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

// MongoDB connection setup
try {
    mongoose.connect('mongodb+srv://jaymehta0113:prolink484@prolinkcluster.wkozyum.mongodb.net/prolink?retryWrites=true&w=majority&appName=ProlinkCluster');

    const db = 'prolink';
    const userData = 'user-data';
    const postData = 'post-data';

    // Schemas
    const signupSchema = new mongoose.Schema({
        userId: String,
        password: String,
        email: String,
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'signup' }]
    });
    const signup = mongoose.model('signup', signupSchema, userData);

    const loginSchema = new mongoose.Schema({
        userId: String,
        password: String
    });
    const login = mongoose.model('login', loginSchema, userData);

    const postSchema = new mongoose.Schema({
        userId: String,
        content: String,
        dateCreated: { type: Date, default: Date.now }
    });
    const post = mongoose.model('post', postSchema, postData);

    // User endpoints
    app.post("/api/signup", async (req, res) => {
        const { userId, password, email } = req.body;
        const tempUser = await signup.findOne({ userId });
        const tempEmail = await signup.findOne({ email });

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

    app.post("/api/login", async (req, res) => {
        const { userId, password } = req.body;
        const tryLogin = await login.findOne({ userId });
        if (!tryLogin) {
            res.status(401).json({ success: false, message: 'Username not found' });
        } else if (tryLogin.password != password) {
            res.status(401).json({ success: false, message: 'Password incorrect' });
        } else {
            const getEmail = await signup.findOne({ userId });
            const token = createTokens(getEmail);
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ message: 'Login completed', 
            success: true, 
            token: token, 
            userId: userId, 
            email: getEmail.email });
        }
    });

    app.get('/api/user-auth', validateTokens, (req, res)=>{
        res.json({ success: true, message: 'User is authenticated' });
    })
    }
    
    catch(error){
        console.log('error connecting to database');
    }
    
    
    // Friend endpoints
    app.post("/api/add-friend", async (req, res) => {
        const { userId, friendId } = req.body;
    
        if (userId === friendId) {
            return res.status(400).json({ message: "Users cannot add themselves as a friend." });
        }
    
        try {
            const user = await signup.findById(userId);
            const friend = await signup.findById(friendId);
    
            if (!friend) {
                return res.status(404).json({ message: "Friend not found" });
            }
    
            if (user.friends.includes(friendId)) {
                return res.status(400).json({ message: "Friend already added" });
            }
    
            user.friends.push(friendId);
            await user.save();
            res.status(201).json({ message: "Friend added successfully", user });
        } catch (error) {
            console.error('Error adding friend:', error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    });
    // Endpoint to retrieve all friends of a user
    app.get("/api/friends/:userId", async (req, res) => {
        const userId = req.params.userId;

    try {
        const user = await signup.findById(userId).populate('friends');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ friends: user.friends });
     } catch (error) {
        console.error('Error listing friends:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
     }
    });

            // Post endpoints
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

// Endpoint to list all users except the current user
app.get("/api/users/:currentUserId", async (req, res) => {
    const currentUserId = req.params.currentUserId;
    try {
        const users = await signup.find({ _id: { $ne: currentUserId } });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});