import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/auth';
import { SearchProvider } from './Context/Search';
import { CartProvider } from './Context/cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
