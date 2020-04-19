const mongoose = require('mongoose');

const schema = mongoose.Schema({
    hashedId : String,
    jwtToken : String
});

const idModel = mongoose.model("IdModel",schema);

module.exports = idModel;

