const User = require('../models/users')
const Post = require('../models/posts');

module.exports.home = async function (req, res) {
   try {
      let posts = await Post.find({}).populate('user').populate( {path:'comment',populate:{ path:'user' }});
      let users = await User.find({});
      return res.render('home', {
         title: "Social Media App",
         content: "Hey Welcome to Social Media",
         posts: posts,
         all_users: users
         
      });
   } catch (err) {
      console.log('Got Error in populating users in posts!', err);
      return;
   }
}