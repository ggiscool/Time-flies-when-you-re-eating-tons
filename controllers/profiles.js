const express = require('express');
const router  = express.Router();

// // link to the models ~~~~~~
const Post = require('../models/posts.js');
const User   = require('../models/users.js');


//view all Users
router.get('/viewallusers', async (req, res) => {
  const allUser = await User.find();
  res.render('users/profile.ejs', {allUsers});
})

//profile show route
router.get('/:id', async (req,res) => {
  const foundId = await User.find({username: req.session.username});
  const posts = await Post.find({ user: foundId[0]._id}).sort({ created_at: -1});

  if (req.session.logged) {
    res.render('users/profile.ejs', {
      foundId: foundId,
      posts: posts,
      username: req.session.username
    });
  }else{
    res.redirect('/user/login');
  };
});

//post up (new route) ***flawless
router.post('/:id', async (req, res) => {
  try {
    const createdPost = await Post.create(req.body);
    res.redirect('/:id');
  } catch (err) {
    res.send(err.message);
  }
});


//deletePost
router.delete('/:id', async (req,res) => {
  const deleteUser = await User.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

module.exports = router;
