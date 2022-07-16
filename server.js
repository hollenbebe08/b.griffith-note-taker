const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


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
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


//tell the server to listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});