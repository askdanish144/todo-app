const PORT = "http://localhost:3001";
// const PORT = "http://192.168.0.108:3001";

const mapServerItemsToLocalItems = (serverItem) => {
  return {
    id: serverItem._id,
    todo: serverItem.todo,
    date: new Date(serverItem.date).toLocaleDateString(),
    completed: serverItem.completed || false,
  }
}

export const getItemsFromServer = async () => {
  try {
    const response = await fetch(`${PORT}/api/get-todo-items`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error("Server error: ", response.status);
    }

    let result = await response.json();
    result = result.map(item => mapServerItemsToLocalItems(item));
    return result;
  } catch (err) {
    console.log('Failed to mark completed', err);
    throw err;
  }
}

export const postNewItemToServer = async (todo, date, completed = false) => {
  try {
    const response = await fetch(`${PORT}/api/post-todo-item`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ todo, date, completed }),
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error("Server error: ", response.status);
    }
    const result = await response.json();
    return mapServerItemsToLocalItems(result);
  } catch (err) {
    console.log('Failed to mark completed', err);
    throw err;
  }
}

export const markCompletedOnServer = async (id) => {
  try {
    const response = await fetch(`${PORT}/api/complete/${id}`, {
      method: "PUT",
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error("Server error: ", response.status);
    }
    return id;
  } catch (err) {
    console.log('Failed to mark completed', err);
    throw err;
  }
}

export const deleteItemFromServer = async (id) => {
  try {
    const response = await fetch(`${PORT}/api/delete-item/${id}`, {
      method: "DELETE",
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    return id;
  } catch (err) {
    console.log('Failed to delete item', err);
    throw err;
  }
}