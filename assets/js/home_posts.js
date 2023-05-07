{
    //method to submit form data in new post using AJAX.
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
           
            $.ajax({
                type:'POST',
                url:'/posts/createPost' ,
                data:newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost( $('.delete-post-button',newPost) );
                },
                error:function(error){
                  console.log(error.responseText);
                }
            })
        })
    }
     //There will be no difference in _id and .id if you are finding the id but in case of comparition it will create a difference.

    let newPostDom = function(post){
        console.log('value of post in newPostDom is',post);
       return $(`
       <li id="post-${post._id}">
       
       <p>
         ${post.content} &ensp;
         ${post.user.name}
         <small>
           <a class="delete-post-button" href="/posts/destroy/${post._id} ", method="GET">&ensp;Delete</a>
         </small>
       </p>

       <div class="post-comments">
        
         <form action="/comments/create" method="POST">
           <input type="text" name="content" placeholder="Type here to add comment.." required />
           <input type="hidden" name="post" value="${post._id}" />
           <input type="submit" value="Add Comment" />
         </form>
           
        <div class="post-comment-list">
        <ul id="post-comment-${post._id}" style="list-style-type: none;">
            
        </ul>
        </div>
       </div>
     </li>`)
    }  

   let deletePost = function(deleteLink){
         $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'GET',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log('value of data found to be is',data);
                  $(`#post-${data.data.post_id}`).remove();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
         })
   }






    //method for creating a post in DOM
    createPost();

}