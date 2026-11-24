import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import AppName from './components/AppName/AppName';
import AddTodoInput from './components/AddToDoInput/AddTodoInput';
import WelcomeMessage from './components/WelcomeMessage/WelcomeMessage';
import TodoItems from './components/ToDoItems/TodoItems';
import { deleteItemFromServer, getItemsFromServer, markCompletedOnServer, postNewItemToServer } from './services/ItemsService';
import Navbar from './components/Layout/Navbar/Navbar';

// import { useContext } from 'react';
// import { AppContext } from './contexts/AppContext';

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getItemsFromServer()
      .then((initialItems) => {setTodoItems(initialItems)});
  }, []);

  const handleNewItem = async (todo, date) => {
    const item = await postNewItemToServer(todo, date);

    const newItem = {
      id: item.id,
      todo: item.todo,
      date: item.date,
      completed: item.completed,
    }

    setTodoItems([newItem, ...todoItems]);
  };

  // Sort items: incomplete items first, then completed items
  const sortedItems = [...todoItems].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    const newTodoItems = todoItems.filter((item) => item.id !== deletedId);
    setTodoItems(newTodoItems);
  };

  const handleToggleComplete = async (id) => {
    await markCompletedOnServer(id);
    // Find the item and toggle its completed status
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        return {
          id: item.id,
          todo: item.todo,
          date: item.date,
          completed: !item.completed,
        };
      }
      return item;
    });
    // Update state
    setTodoItems(updatedItems);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-r from-purple-100 to-blue-100 py-12 px-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-8">
              <AppName />
              <AddTodoInput onNewItem={handleNewItem} />
              {todoItems.length === 0 && <WelcomeMessage />}
              <TodoItems
                todoItems={sortedItems}
                onDeleteClick={handleDeleteItem}
                toggleComplete={handleToggleComplete}
              ></TodoItems>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App; 