const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./data/notes.json');

//hardcodes the port for heroku
const PORT = process.env.PORT || 3001;

//insantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//makes js and css information static upon load
app.use(express.static('public'));


//function to create a new note
function createNewNote(body, notesArray) {
    const notes = body;
    notesArray.push(notes);

    //write to file
    fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
  
    // return finished code to post route for response
    return notes;
};

//route to the notes database file
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

//route to Post new notes to the server
app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length;

    // add notes to json file and notes array
    const newNote = createNewNote(req.body, notes);

  res.json(newNote);
});

//get route to notes.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//tell the server to listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });