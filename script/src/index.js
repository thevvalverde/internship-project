import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const widgetDivs = document.querySelectorAll('.tekprivacy-widget')

widgetDivs.forEach(div => {
  const root = ReactDOM.createRoot(div);
  root.render(
    <React.StrictMode>
      <App useremail={div.dataset.useremail} orgref={div.dataset.orgref} />
    </React.StrictMode>
  )
})
