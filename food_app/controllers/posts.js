const express = require('express');
const router  = express.Router();

// link to the models ~~~~~~
const Post = require('../models/posts.js');
//for when we add COMMENTS ~~~~~~
// const Comment = require('../models/comments.js');

//INDEX route
router.get('/', async (req, res) => {
  const allPosts = await Post.find();
  // if (req.session.logged) {
    res.render('posts/index.ejs', {
      posts: allPosts
      // username: req.session.username
  //   });
  // } else {
  //   res.redirect('/user/login');
})
});

//SHOW route
router.get('/:id', async (req, res) => {
  const onePost = await Post.findById(req.params.id);
  // const comments = await Comment.find({ post:: onPost._id});

  res.render('posts/show.ejs'), {
    onePost: onePost
    // comments: comments
  }
});

//CREATE route
router.post('/', async (req, res) => {
  try {
    const createdPost = await Post.create(req.body);
    res.redirect('/');
  } catch (err) {
    res.send(err.message);
  }
});

//POST route





module.exports = router;
