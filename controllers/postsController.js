const Post = require('../models/posts');

module.exports.create = async function (req, res) {
    console.log('in postsController value of req.body and req.user are',req.boyd, req.user);
    let response = await Post.create({ content: req.body.content, user: req.user._id });
    if(!response){
        console.log('Got Error in creating Post!');
            return;
    }else{
        return res.redirect('back');
    }
}