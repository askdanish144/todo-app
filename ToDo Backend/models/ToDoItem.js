const mongoose = require("mongoose");

const toDoItemSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("ToDoItem", toDoItemSchema);
