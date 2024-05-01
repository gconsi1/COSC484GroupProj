require("dotenv").config({path: "./config.env"});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');


const app = express();
app.use(bodyParser.json());
app.listen(5000, () =>console.log('server running on port 5000'));
app.use(bodyParser.json());

//get login data to databse
try{
mongoose.connect('mongodb+srv://jaymehta0113:prolink484@prolinkcluster.wkozyum.mongodb.net/prolink?retryWrites=true&w=majority&appName=ProlinkCluster');

const db = 'prolink';
const collection = 'user-data';

const userSchema = new mongoose.Schema({
    userId: String,
    password: String
})

const User = mongoose.model('User', userSchema, collection)


app.post('/api/login', async (req, res)=>{
    console.log(req.body);

    const{userId, password} = req.body;

    try {
        // Create a new user document and save it to the database
        const newUser = await User.create({ userId, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
    
})


}
catch(error){
    console.log('error connecting to database');
}