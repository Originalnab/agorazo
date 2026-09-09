import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { AuthProvider } from './context/AuthContext';
import { SavedCarsProvider } from './context/SavedCarsContext';
import { CartCheckoutProvider } from './context/CartCheckoutContext';
import './index.css';

// Register Service Worker for PWA (PRD Section 71)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.error('ServiceWorker registration failed: ', err);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <SavedCarsProvider>
        <CartCheckoutProvider>
          <RouterProvider router={router} />
        </CartCheckoutProvider>
      </SavedCarsProvider>
    </AuthProvider>
  </React.StrictMode>,
);
