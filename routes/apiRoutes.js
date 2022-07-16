const fs = require('fs');
const router = require('express').Router();
const path = require('path');
let  notes  = require('../data/notes.json');

//route to the notes database file
router.get('/notes', (req, res) => {
    res.json(notes);
});

//route to Post new notes to the server
router.post('/notes', (req, res) => {
    const newNote = {
        title:req.body.title,
        text:req.body.text,
        id:notes.length
    }
    console.log(newNote);
    res.json(newNote);

    notes.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify(notes)
    );
});

module.exports = router;
