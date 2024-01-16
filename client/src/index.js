import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/auth';
import "antd/dist/reset.css"
import { CartContextProvider } from './context/cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <CartContextProvider>
            <Router>
                <App />
            </Router>
        </CartContextProvider>
    </AuthContextProvider>
);