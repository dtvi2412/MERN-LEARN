const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({ 
    username : {type: String, require, unique: true},
    password: {type: String, require}
    },
    { timestamps: true }
)

module.exports = mongoose.model('users',UserSchema);