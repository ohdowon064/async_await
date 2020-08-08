const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    index : Number,
    id : {
        type: String,
        unique : true
    },
    name : String,
    password : password,
    created_at : {
        type : Date,
        default : Date.now
    }
});

UserSchema.plugin(autoIncrement.plugin,{ 
    model : 'User', 
    field : 'index', 
    startAt : 1, //시작 
    increment : 1 // 증가 
});

module.exports = mongoose.model('User', UserSchema);