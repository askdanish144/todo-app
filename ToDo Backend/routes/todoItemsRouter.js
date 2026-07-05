// External module.. 
const express = require('express'); 
const todoItemsRouter = express.Router(); 

// Local Module.. 
const todoItemsController = require('../controllers/todoItemsController'); 

todoItemsRouter.get('/get-todo-items', todoItemsController.getToDoItems); 
todoItemsRouter.post('/post-todo-item', todoItemsController.postToDoItem); 
todoItemsRouter.delete('/delete-item/:id', todoItemsController.deleteToDoItem); 
todoItemsRouter.put('/complete/:id', todoItemsController.markCompleted); 


module.exports = todoItemsRouter; 