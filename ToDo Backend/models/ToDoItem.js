const mongoose = require('mongoose'); 

const toDoItemSchema = mongoose.Schema({
    todo: {
        type: String, 
        required: true
    }, 
    date: {
        type: String, 
        required: true
    }, 
    completed: {
        type: Boolean, 
        default: false,
    }
})

module.exports = mongoose.model("ToDoItem", toDoItemSchema); 