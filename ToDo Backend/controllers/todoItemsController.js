const ToDoItem = require('../models/ToDoItem');

exports.getToDoItems = async (req, res, next) => {
    const todoitems = await ToDoItem.find();
    res.status(200).json(todoitems);
}

exports.postToDoItem = async (req, res, next) => {
    const { todo, date, completed } = req.body;
    const todoitem = new ToDoItem({ todo, date, completed });
    await todoitem.save()
    res.status(200).json(todoitem);
}

exports.deleteToDoItem = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    await ToDoItem.findByIdAndDelete(id);
    res.status(204).json({ _id: id });
}

exports.markCompleted = async (req, res, next) => {
    const { id } = req.params;
    const todoitem = await ToDoItem.findById(id);
    todoitem.completed = !todoitem.completed;
    await todoitem.save();
    res.status(200).json({ id }); 
}