require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Configure CORS options
const corsOptions = {
    origin: function (origin, callback) {
        // List of allowed origins
        const allowedOrigins = ['http://localhost:3000', 'https://crud.live', 'https://admin.crud.live'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow CORS for this request
        } else {
            callback(new Error('Not allowed by CORS')); // Block the request
        }
    },
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions)); // Enable CORS with the specified options
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI; // Use the environment variable for the connection string
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema for the Hash data
const HashSchema = new mongoose.Schema({
    classId: String,
    hash: String
});

// Create a model from the schema
const Hash = mongoose.model('Hash', HashSchema);

// Define a route to save data to Hash collection
app.post('/api/hash', (req, res) => {
    const newHash = new Hash({
        classId: req.body.classId,
        hash: req.body.hash
    });

    newHash.save()
        .then(hash => res.send(hash))
        .catch(err => res.status(400).send(err));
});

// Route to get a single hash by classId
app.get('/api/hash/:classId', (req, res) => {
    Hash.findOne({ classId: req.params.classId })
        .then(hash => {
            if (!hash) {
                res.send([]); // Return an empty array if no hash is found
            } else {
                res.send(hash); // Send the found hash
            }
        })
        .catch(err => res.status(400).send(err));
});


// Route to get all hashes
app.get('/api/hash', (req, res) => {
    Hash.find()
        .then(hash => res.send(hash))
        .catch(err => res.status(400).send(err));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
