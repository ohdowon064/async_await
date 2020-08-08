const mongoose = require('mongoose');

const KartPatchSchema = new mongoose.Schema({
    index : Number,
    title : String,
    content : String,
    created_at : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('KartPatch', KartPatchSchema);