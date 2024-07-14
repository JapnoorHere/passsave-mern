const mongoose = require('mongoose');
const passwordSchema = new mongoose.Schema({
    site: String,
    username: String,
    password: String
}, {
    collection: "passwords"
});

const passwordModel = mongoose.model('PassWordModel', passwordSchema);
module.exports = passwordModel; 