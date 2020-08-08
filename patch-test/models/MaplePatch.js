const mongoose = require('mongoose');

const MaplePatchSchema = new mongoose.Schema({
    index : Number,
    title : String,
    content : String,
    created_at : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('MaplePatch', MaplePatchSchema);
