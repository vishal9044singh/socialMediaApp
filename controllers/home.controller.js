module.exports.home = function(req,res){
   return res.render('home',{
      title:"MY TODO APP",
      content:"Hey Welcome to the APP."
   });
}