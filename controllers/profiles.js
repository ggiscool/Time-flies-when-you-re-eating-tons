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

// //profile show route
// router.get('/:id', async (req,res) => {
//   const foundId = await User.findById(req.params.id);
//   const posts = await Post.find({ user: foundId._id});
//
//   if (req.session.logged) {
//     res.render('users/profile.ejs', {
//       foundId: foundId,
//       posts: posts,
//       user: req.session.username
//     });
//   }else{
//     res.redirect('/user/login');
//   };
// });



//deletePost
router.delete('/:id', async (req,res) => {
  const deleteUser = await User.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

module.exports = router;
