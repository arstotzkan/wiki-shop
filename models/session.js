const mongoose = require('mongoose');

module.exports = mongoose.model('Session', 
        new mongoose.Schema({ session_id: String, username: String}));