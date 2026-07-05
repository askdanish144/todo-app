import { useRef, useState } from "react";

function AddTodo({ onNewItem }) {
  const todoRef = useRef("");
  const dateRef = useRef("");

  const handleAddButtonClicked = () => {
    onNewItem(
      todoRef.current.value,
      dateRef.current.value
    );
    todoRef.current.value = "";
    dateRef.current.value = "";
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter Todo Here"
            ref={todoRef}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="sm:w-1/3">
          <input
            type="date"
            ref={dateRef}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            onClick={handleAddButtonClicked}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
