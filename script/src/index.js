import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const widgetDivs = document.querySelectorAll('.tekprivacy-widget')

console.log("acutally here!");

widgetDivs.forEach(div => {
  const root = ReactDOM.createRoot(div);
  root.render(
    <React.StrictMode>
      <App id={div.dataset.userid} />
    </React.StrictMode>
  )
})

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
