import React from 'react';
import ReactDOM from 'react-dom/client';
import ToDoApp from './ToDoApp';
import Store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Store.Provider initialState={{ todos: [] }}>
      <ToDoApp />
    </Store.Provider>
  </React.StrictMode>
);
