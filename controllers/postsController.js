const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = async function (req, res) {
    console.log('in postsController value of req.body and req.user are', req.boyd, req.user);
    try{
        let post = await Post.create({ content: req.body.content, user: req.user._id });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!"
            });
        }
        req.flash('success','Your Post is Uploaded!')
        return res.redirect('back');
    }catch(err){
        console.log('Got Error in creating Post!',err);
        req.flash('Error',err)
        return res.redirect('back');
    }
}

module.exports.destroy = async function (req, res){
    console.log('in posts.controller in destroy req.params and req.user are', req.params, req.user);
    try{
     let post = await Post.findById(req.params.id);
     //here using .id will automatically convert _id to string, .id is given by mongoose.
     if(post.user == req.user.id){
        await Post.findByIdAndDelete(post._id);
        await Comment.deleteMany({post: req.params.id});
        
        if(req.xhr){
            return res.status(200).json({
                data:{
                  post_id:req.params.id
                },
                message:"Post deleted successfully"
            })
        }

        req.flash('success','Post Deleted Successfully!')
        return res.redirect('back');
     }else{
        req.flash('error','You cannot delete this Post!');
        return res.redirect('back');
     }
    }catch(err){
        console.log('Failed to delete post along with the comments!',err);
        req.flash('error',err);
        return res.redirect('back');
    }
}