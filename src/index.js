import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import EmployeesProvider from './context/Employees' 
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    
    <EmployeesProvider>
    
      <App />
    
    </EmployeesProvider> 

  </React.StrictMode>,
  document.getElementById('root')
);