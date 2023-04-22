const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');
}

module.exports = main()
.then((data)=>{
    console.log('successfully connected to the database!');
})
.catch((err)=>{
    console.log('got error in connecting the the database!',err);
})
