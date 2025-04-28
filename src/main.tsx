import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import App from './App';
import './index.css';

/**
 * Main entry point for the React application
 * 
 * Important notes for API integration:
 * 1. The Router component must wrap the entire application to enable routing
 * 2. The HeroUIProvider provides theming and component styles
 * 3. ToastProvider enables toast notifications throughout the app
 * 
 * For Clerk integration:
 * - Add <ClerkProvider> around the Router component
 * - Configure with your Clerk publishable key
 * Example:
 * <ClerkProvider publishableKey="your_publishable_key">
 *   <Router>
 *     <HeroUIProvider>
 *       <ToastProvider />
 *       <App />
 *     </HeroUIProvider>
 *   </Router>
 * </ClerkProvider>
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <HeroUIProvider>
        <ToastProvider />
        <App />
      </HeroUIProvider>
    </Router>
  </React.StrictMode>,
);