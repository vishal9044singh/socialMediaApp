const mongoose = require('mongoose');

//created postSchema ,i.e, how to store the posts in db along with the user details.
const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});


const Post = mongoose.model('Post',postSchema);

//exported this postSchema for using it in views post section.
module.exports = Post;