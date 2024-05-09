require("dotenv").config({path: "./config.env"});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.listen(5000, () =>console.log('server running on port 5000'));
app.use(bodyParser.json());

//get login data to databse
try{
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


//post methods to handle backend operations
app.post("/api/signup", async (req, res)=>{
    console.log(req.body);

    const{userId, password, email} = req.body;

    const tempUser = await signup.findOne({userId});
    const tempEmail = await signup.findOne({email});

    try {
        // Create a new user document and save it to the database

        if(!tempUser && !email){
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
        const token = jwt.sign({ username: userId }, "S-KEY");
        res.status(200).json({message: 'Login completed', success: true, token: token})
    }

})

}
catch(error){
    console.log('error connecting to database');
}
