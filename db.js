const mongoose = require('mongoose');

// Define the MongoDB connection URL

const MongoURL = 'mongodb://localhost:27017/hotels'  // Replace 'database' with your database name

// Set up MongoDB connection 
mongoose.connect(MongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error;', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// comment add for testing purpose