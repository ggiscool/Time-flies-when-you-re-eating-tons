const express  = require('express');
const mongoose = require('mongoose');
const morgan   = require('morgan');
const methodOverride = require('method-override');
require('pretty-error').start();
const session = require('express-session');
const app      = express();
const bcrypt = require('bcrypt');

//encrypt password ~~~~~~
const hashedString = bcrypt.hashSync('GG', bcrypt.genSaltSync(10));
console.log(hashedString);

let test = bcrypt.compareSync('GG', hashedString);
console.log(test);

//process.env.PORT
const PORT     = process.env.PORT || 3000;

//process.env.MONGODB_URI
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Time-flies-when-you-re-eating-tons';
// connect to database ~~~~~~
mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;

// test db connection ~~~~~~
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));


// Will I need this? ~~~~~~
const usersModel = require('./models/users.js');

// middleware ~~~~~~
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(methodOverride('_method'));


// SESSION stuff ~~~~~~
app.use(session({
  secret: "khgvcluygtud",
  resave: false,
  saveUninitialized: false
  }));

// controllers ~~~~~~
const postsController = require('./controllers/posts.js');
// // add in for COMMENTS ~~~~~~
// const commentsController = require('./controllers/comments.js');
// add in for log-in/registration ~~~~~~
const sessionsController = require('./controllers/sessions.js');

app.use('/posts', postsController);
// //add in for COMMENTS ~~~~~~
// app.use('/comments', commentsController);
//add in for LOG-IN/registration
app.use('/user', sessionsController);

// ROOT route ~~~~~~
app.get('/', (req, res) => res.redirect('/posts'));

// Listening on Port 3k ~~~~~~
app.listen(PORT, () => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('Food app running on port: ', PORT);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
});

module.exports = app;
