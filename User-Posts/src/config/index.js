const mongoose = require('mongoose');
// require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();

async function connect (){
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learning.4lvit.mongodb.net/mern-learning?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connect DB success!');
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = { connect };