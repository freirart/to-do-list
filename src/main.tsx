import React from 'react';
import ReactDOM from 'react-dom/client';
import ToDo from './ToDo';
import Store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Store.Provider initialState={{ todos: [] }}>
      <ToDo />
    </Store.Provider>
  </React.StrictMode>
);
