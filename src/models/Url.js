const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String, 
        required: true, 
    }, 
    shortUrl: {
        type: String, 
        required: true,
    }, 
    urlCode: {
        type: String,
        required: true, 
    }, 
    date: {
        type: Number, 
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Url', UrlSchema);

// https://github.com/manualdodev/todolist-fullstack/blob/main/backend/src/controllers/tasksController.js