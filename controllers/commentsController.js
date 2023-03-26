const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = async function (req, res) {
    console.log('in commentsController in create req.body is', req.body);
    console.log('in commentsController in create req.user is', req.user);
    try {
        let post = await Post.findById(req.body.post);
        if(post){
            let createdComment = await Comment.create({ content: req.body.content, post: req.body.post, user: req.user._id });
            post.comment.push(createdComment);
            post.save();
            req.flash('success','Your Comment is Added!')
            console.log('Successfully created comment in db!');
            return res.redirect('/');
        }else{
            req.flash('error','This Post Doesnot Exists!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',err);
        console.log('got error in posting comment !!!', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function (req, res) {
    console.log('in commentsController in destroy', req.user, req.params);
    try {
        let cmnt = await Comment.findById(req.params.id);
        let post = await Post.findById(cmnt.post);
        if (post.user == req.user.id || cmnt.user == req.user.id) {
            await Comment.findByIdAndDelete(cmnt._id);
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Got Error in deleting Comment!',err);
        return ;
    }
}