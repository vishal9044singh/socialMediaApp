module.exports.home = function(req,res){
   console.log('reqested cookie are:',req.cookies);
   res.cookie('user_id',25);
   return res.render('home',{
      title:"MY TODO APP",
      content:"Hey Welcome to the APP."
   });
}