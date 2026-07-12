const ToDoItem = require("../models/ToDoItem");
const User = require("../models/User");

exports.getToDoItems = async (req, res, next) => {
  try {
    const todoItems = await ToDoItem.find({ userID: req.session.userID });
    res.status(200).json(todoItems);
  } catch (error) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

exports.postToDoItem = async (req, res, next) => {
  const userID = req.session.userID;
  const user = await User.findById(userID);
  const { todo, date, completed } = req.body;

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User doesn't exist.",
    });
  }

  const todoitem = new ToDoItem({ todo, date, completed, userID });
  await todoitem.save();
  res.status(200).json(todoitem);
};

exports.deleteToDoItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await ToDoItem.findOneAndDelete({
      _id: id,
      userID: req.session.userID,
    });

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized." });
    }

    res.status(204).json({ _id: id });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

exports.markCompleted = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const todoitem = await ToDoItem.findById(id);
    const todoitem = await ToDoItem.findOneAndUpdate({
      _id: id,
      userID: req.session.userID,
    });

    todoitem.completed = !todoitem.completed;
    await todoitem.save();
    res.status(200).json({ id });
    
  } catch (err) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};
