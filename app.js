// mongodb+srv://tranbanam33:6wGcZnBpO8nyWMCY@bchainlms.hobpplr.mongodb.net/?retryWrites=true&w=majority&appName=BChainLMS

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://tranbanam33:6wGcZnBpO8nyWMCY@bchainlms.hobpplr.mongodb.net/?retryWrites=true&w=majority&appName=BChainLMS';
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
