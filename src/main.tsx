import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Fix Recharts ResponsiveContainer ResizeObserver errors
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && /defaultProps will be removed/.test(args[0])) return;
  if (typeof args[0] === 'string' && /ResizeObserver loop/.test(args[0])) return;
  originalError.call(console, ...args);
};

window.addEventListener('error', e => {
  if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'ResizeObserver loop completed with undelivered notifications.') {
    const resizeObserverErrDiv = document.getElementById(
      'webpack-dev-server-client-overlay-div'
    );
    const resizeObserverErr = document.getElementById(
      'webpack-dev-server-client-overlay'
    );
    if (resizeObserverErr) {
      resizeObserverErr.setAttribute('style', 'display: none');
    }
    if (resizeObserverErrDiv) {
      resizeObserverErrDiv.setAttribute('style', 'display: none');
    }
    e.stopImmediatePropagation();
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
