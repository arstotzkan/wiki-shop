const mongoose = require('mongoose');

module.exports = mongoose.model('User', 
        new mongoose.Schema({ user_id: Number, name: String, password: String, cart:Array}));