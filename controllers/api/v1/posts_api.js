const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');


module.exports.index = async function(req, res){
    let posts = await Post.find({}).populate('user').populate( {path:'comment',populate:{ path:'user' }}).sort('-createdAt');

    return res.json(200, {
        message:'List of Post',
        posts: posts
    })
}

module.exports.destroy = async function (req, res){
    console.log('in posts.controller in destroy req.params and req.user are', req.params, req.user);
    try{
     let post = await Post.findById(req.params.id);
     //here using .id will automatically convert _id to string, .id is given by mongoose.
     if(post.user == req.user.id){
        await Post.findByIdAndDelete(post._id);

        await Comment.deleteMany({post: req.params.id});

        return res.json(200, {
            message:'Posts and associated comments deleted successfully!',
        })
        // req.flash('success','Post Deleted Successfully!')
        // return res.redirect('back');
     }else{
         return res.json(401, {
            message:'You cannot delete this post!'
         })
     }
    }catch(err){
         console.log('Failed to delete post along with the comments!',err);
        // req.flash('error',err);
        return res.json(500,{
            message:"Internal Server Error!"
        });
    }
}