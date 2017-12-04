const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User   = require('../models/users.js');

router.get('/login', (req, res) => {
  // console.log(req.session);
  res.render('posts/login.ejs', {
  message: req.session.message
  });
});

router.post('/login',  async(req, res) => {
  try {
  const user = await User.findOne({username: req.body.username});
  if (bcrypt.compareSync(req.body.password, user.password)){
    req.session.username = req.body.username;
    req.session.logged = true;
    console.log(req.session);
    res.redirect('/');
  } else {
  console.log('bad password');
  req.session.message = "Username or password are incorrect";
  res.redirect('/user/login');
  }
} catch (err) {
  console.log(err);
  }
// });

  //save username to session variable
  req.session.username = req.body.username;
  //log info
  req.session.logged = true;
  console.log(req.session);
  //redirect back home
  res.redirect('/');
});


//where user will enter personal info to register
router.post('/register', async (req, res, next) => {
  //get password from what user entered -- never store in db w/o encryption
const password = req.body.password;
//encrypt it
const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//grab Username
const username = req.body.username;
//put user info into db
const userDbEntry = {};
//set username to be username
userDbEntry.username = username;
//set password as ENCRYPTED password
userDbEntry.password = passwordHash;
//What does await do???
// await User.create(userDbEntry);
console.log(userDbEntry);

try {
  const user = await User.create(userDbEntry);
  console.log(user);
  req.session.username = user.username;
  req.session.logged = true;
  res.redirect('/');
} catch(err) {
console.log(err);
}
});


router.get('/', (req, res) => {
  // we need to render the login view.
});

router.post('/', (req, res) => {
  // After posting the form to this route, we should analyze the session variables
});

router.get('/logout', (req, res) => {
  // here we destroy the session
  req.session.destroy();
  res.redirect('/');
});

router.get('/update', (req, res) => {
  req.session.anyProperty = "SOMETHING";
  console.log(req.session);
});

// export the controller
module.exports = router;
