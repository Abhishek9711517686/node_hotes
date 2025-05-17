const express = require('express');
const app = express();
const PORT = 5000;
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person');
const MenuItem = require('./models/MenuItem')

app.get('/', function(req, res) {
    res.send("Welcome to my hotel sir... How i can help you ? we have list of names")
})

// Post route to add a person
app.post('/person', async (req, res) => {
    try{
        const data = req.body   //  Assuming the request body contians the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //  Save the new person to database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server Error'});
    }
   
    Person.save((error, savedPerson) => {
        if(error){
            console.log('Error saving person:', error);
            res.status(500).json({error: 'Internal server error'})
        }
        else{
            console.log('data saved successfully');
            res.status(200).json(savedPerson);
        }
    })

})


// GET method to get the person
app.get('/person', async (req, res) => {
    try{
        const data = await Person.find(); 
        console.log('data fetched');
        res.status(200).json(data);      
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server Error'});
    }
})

// app.get('/person/:workType', async(req, res) => {
//     try{
//         const workType = req.params.workType; // Extract the work type from the URL parameter
//         if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {
//             const response = await Person.find({work: workType});
//             console.log('response fetched');
//             res.status(200).json(response);
//         }else{
//             res.status(404).json({error: 'Invalid work type'});
//         }
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

app.listen(PORT, function(err) {
    if(err) console.log('Error in the server setup')
    console.log('listening on port' ,PORT);
})

// comment add for testing purpose 
// module exports
module.exports = db;