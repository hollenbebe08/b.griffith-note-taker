const path = require('path');
const router = require('express').Router();

//get route to notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//get route to index.html file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

module.exports = router;