// index.js (or your entry point file)
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store
import App from './App'; // Your main application component
// import { Buffer } from 'buffer';
// window.Buffer = Buffer;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      
        <App />
        </Provider>
     
   
  </React.StrictMode>,
  document.getElementById('root')
);
