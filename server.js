const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Make sure to require 'path'

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); // Add this line

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Catch-all handler for any request that doesn't match one above
// to send back the React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/homePagev2.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));