import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import client from './async/actions';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToolsContextProvider } from './store/context/toolsContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ToolsContextProvider>
        <App />
      </ToolsContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);


reportWebVitals();
