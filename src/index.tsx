import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Import the registry to ensure all components are registered
import './registry/ExtendedComponentRegistry';

console.log('🚀 AI Component System: Starting application...');

const container = document.getElementById('root');
if (!container) {
    throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

console.log('✅ AI Component System: Application started successfully');

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
    // Add performance monitoring
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('Performance:', entry.name, entry.duration);
        }
    });
    observer.observe({ entryTypes: ['navigation', 'paint'] });
}
