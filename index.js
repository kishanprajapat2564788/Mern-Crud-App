const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();                                         // environment variables for .env files

const app = express();
const port = process.env.PORT || 3001;                               //create express sever 


app.use(cors ());                                                   //cors middleware
app.use(express.json());                                            // express middleware and it is for sending and recieving json responses

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Connection Established");
});



const excerciseRouter = require('./Routes/exercise');
const usersRouter = require('./Routes/user');

app.use('/exercise', excerciseRouter);                 // when user going to excercise route then excerciseRouter will redirect
app.use('/user', usersRouter);                         // when user going to user route then usersRouter will redirect


console.log(path.resolve(__dirname, 'frontend/build','index.html'))
app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'frontend','build')));
    res.sendFile(path.resolve(__dirname, 'frontend','build','index.html'));
})


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

// // Export the Express API
// module.exports = app;