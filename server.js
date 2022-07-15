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

//function to filter by Query
function filterByQuery(query, notesArray){
    let filteredResults = notesArray;
    if(query.title){
        filteredResults = filteredResults.filter(notes => notes.title === query.title);
    }
    return filteredResults;
};

//function to find a note by its id
function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
};

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

//function to validate the new note ihas valid information entered into it
// function validateNewNote(newNote) {
//     if (!newNote.name || typeof newNote.title !== 'string') {
//       return false;
//     }
//     if (!newNote.text || typeof newNote.text !== 'string') {
//       return false;
//     }
// }

//route to the notes database file
app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//route to specific notes using their ids
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
      res.json(result);
});

//route to Post new notes to the server
app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // add notes to json file and notes array
    const newNote = createNewNote(req.body, notes);

  res.json(newNote);
});

//tell the server to listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });