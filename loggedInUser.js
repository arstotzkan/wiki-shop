const mongoose = require('mongoose');

module.exports = mongoose.model('LoggedInUser', 
        new mongoose.Schema({ user_id: Number, name: String, password: String, cart:Array}));