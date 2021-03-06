const express = require('express');
const router  = express.Router();

// link to the models ~~~~~~
const Post = require('../models/posts.js');
const User   = require('../models/users.js');

//for when we add COMMENTS ~~~~~~
// const Comment = require('../models/comments.js');

//INDEX route
router.get('/', async (req, res) => {
  //query a post model
  const allPosts = await Post.find().sort( { created_at: -1 } );
  const foundId = await User.find({username: req.session.username});
  // console.log(allPosts);
  // console.log(req.session.username);
  if (req.session.logged) {
    res.render('posts/index.ejs', {
      posts: allPosts,
      foundId: foundId,
      username: req.session.username
    });
  } else {
    res.redirect('/user/login');
}
});


//SEED posts
router.post('/seed', async (req, res)=>{
  const seedPosts = await Post.create([
    {
      img: "http://ot-foodspotting-production.s3.amazonaws.com/reviews/2983949/thumb_600.jpg?1357912983?1510170408",
      caption: "Crawfish Beignet at Katie's",
      post: "I do not usually follow Guy Fieri's advice. However, this dish not only looked so good that as I flicked past it on tv that I then backtracked to it, but it is made at a place called Katie's in New Orelans, and my best friend Katie was living in New Orleans at the time so it was FATE. When I visted Nola this past June, Katie and I went to Katie's and I followed Mr. Fieri's rec. The Crawfish Beignet came out looking like a softball-sized and -shaped calzone covered in a cream sauce, with a side of sad salad, but like, who orders this dish for the salad? When I sliced into the perfectly crispy beignet, creamy, buttery crawfish cascaded out in a molten magmatic cheese sauce. Pure cheesy seafood heaven. This was easily the best seafood dish I have ever eaten, and my favorite meals overall. 10/10 would eat once a week, more if calories were hypothetical.",
      submitted_by: 'ggiscool',
      location: 'New Orleans, LA',
      link: "http://www.katiesinmidcity.com/menu.html"
    },
    {
      img: "http://www.glenwoodnyc.com/manhattan-living/wp-content/uploads/2015/02/xian-famous-foods-spinach-dumplings.jpg",
      caption: "Spinach Dumplings(F6) at Xi'an Famous Foods",
      post: "I love meat dumplings. Any kind of meat wrapped up and fried or steamed (or whatever) is chill with me. Also, I did not eat most vegeatables until I was of age to drink. That being said, these spinach dumplings are the most delicious dumplings I have ever had. They are huge, maybe 3-bite dumplings, soaked in a spicy/sour oily sauce. They are so big and filling that you could totally eat them as a (not very well-rounded) meal, as I have many times. An old neighbor in Greenpoint, Brooklyn recommended I go to the, since-relocated, Xi'an Famous Foods location a a few blocks from my old apartment, and I went probably once a week the remainder of the time I lived in Greenpoint, even when they reopened much further away. 10/10 would move back to Brooklyn for this dish.",
      submitted_by: 'ggiscool',
      link: "http://xianfoods.com/menu/"
    },
    {
      img: "https://clovereats.files.wordpress.com/2015/06/rubamba-5.jpg",
      caption: "Colombian Chancho Arepas",
      post: "A truly delicious South American dish. Delicious pulled pork on a bed of yellow rice, surrounded by perfectly-cooked plantains and drizzled in guacamole. You can always judge latin-american food by the plantians, and these are perfect. The only downside is that the prices are about $5 more expensive at the restaurant than at their food truck, with the only difference being presentation and ambience. 10/10 would walk to the cart every day.",
      submitted_by: 'ggiscool',
      link: "http://www.rubamba.com/usa/"
    }
  ]);

  res.redirect('/posts');
});


//CREATE route
//post adds data to db
//post up (new route) ***flawless
router.post('/', async (req, res) => {
  try {
    const createdPost = await Post.create(req.body);
    res.redirect('/');
  } catch (err) {
    res.send(err.message);
  }
});

//new ROUTES
router.get('/new', async (req, res) => {
  // const oneUser = await User.find({username: req.session.username});
  const foundId = await User.find({username: req.session.username});
  // const oneUser = req.session.id;
  console.log("foundId ", foundId);
  res.render('posts/new.ejs', {username: req.session.username, foundId: foundId});
});

//SHOW route
router.get('/:id', async (req, res) => {
  const onePost = await Post.findById(req.params.id);
  const foundId = await User.find({username: req.session.username});
  // const comments = await Comment.find({ post:: onPost._id});
console.log(onePost);
  res.render('posts/show.ejs', {onePost: onePost, username: req.session.username, foundId: foundId})
});


//DELETE
router.delete('/:id', async (req, res) =>{
  const deletePost = await Post.findByIdAndRemove(req.params.id);
  res.redirect('/posts');
});

//EDIT/Update
//Find post by id
router.get('/:id/edit', async (req, res) => {
  const editPost = await Post.findById(req.params.id);
  const foundId = await User.find({username: req.session.username});
  res.render('posts/edit.ejs', {Post: editPost, username: req.session.username, foundId: foundId});
});
//put new info into body
router.put('/:id', async (req, res) => {
  const updatePost = await
  Post.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/posts');
});




module.exports = router;
