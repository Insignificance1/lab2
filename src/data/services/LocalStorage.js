const TODO_ITEMS_LOCAL_STORAGE_KEY = 'TODO_ITEMS_LOCAL_STORAGE_KEY';

export const LocalStorage = {
  getTodoItemsFromLocalStorage: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rawData = localStorage.getItem(TODO_ITEMS_LOCAL_STORAGE_KEY);
        const defaultResult = [];
        
        if (!rawData) {
          resolve(defaultResult);
          return;
        }
        const data = JSON.parse(rawData);
    
        if (!Array.isArray(data)) {
          resolve(defaultResult);
          return;
        }
    
        resolve(data);
      }, 0);
    })
  },

  saveTodoItemToLocalStorage: (todoItem) => {
    return new Promise((resolve, reject) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const newTodoItems = [...todoItems, todoItem];
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(newTodoItems));
        resolve();
      })
    });
  },

  deleteTodoItemFromLocalStorage: (id) => {
    return new Promise((resolve) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const filteredTodoItems = todoItems.filter((item) => item.id !== id);
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(filteredTodoItems));
        resolve();
      });
    });
  },
  toggleTodoItemInLocalStorage: (id, isDone) => {
    return new Promise((resolve) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const updatedTodoItems = todoItems.map((item) =>
            item.id === id ? { ...item, isDone } : item
        );
        localStorage.setItem(
            TODO_ITEMS_LOCAL_STORAGE_KEY,
            JSON.stringify(updatedTodoItems)
        );
        resolve();
      });
    });
  },
  updateTodoPriorityInLocalStorage: ({ id, priority }) => {
    return new Promise((resolve) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const updatedItems = todoItems.map((item) =>
            item.id === id ? { ...item, priority } : item
        );
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
        resolve();
      });
    });
  },
}