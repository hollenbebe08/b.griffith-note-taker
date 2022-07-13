const express = require('express');
const { notes } = require('./data/notes.json');

//hardcodes the port for heroku
const PORT = process.env.PORT || 3001;

//insantiate the server
const app = express();

//function to filter by Query
function filterByQuery(query, notesArray){
    let filteredResults = notesArray;
    if(query.title){
        filteredResults = filteredResults.filter(notes => notes.title === query.title);
    }
    return filteredResults;
};

//route to the notes database file
app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json( results);
});

//tell the server to listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });