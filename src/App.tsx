import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Lazy load components for better performance
const AIGeneratorDemo = React.lazy(() => import('./components/demo/AIGeneratorDemo'));
const ComponentShowcase = React.lazy(() => import('./components/demo/ComponentShowcase'));

// Loading component
const LoadingSpinner: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading AI Component System...</p>
        </div>
    </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: Error }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('🚨 App Error Boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center max-w-md mx-auto p-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
                        <p className="text-gray-600 mb-4">
                            We encountered an error while loading the AI Component System.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Reload Page
                        </button>
                        <details className="mt-4 text-left">
                            <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                                Technical Details
                            </summary>
                            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
          {this.state.error?.stack}
          </pre>
                        </details>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    {/* Navigation */}
                    <nav className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-md bg-white/90">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center space-x-8">
                                    <Link to="/" className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <span className="text-xl font-bold text-gray-900">AI Component System</span>
                                    </Link>

                                    <div className="hidden md:flex space-x-6">
                                        <Link
                                            to="/"
                                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
                                        >
                                            Generator
                                        </Link>
                                        <Link
                                            to="/showcase"
                                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
                                        >
                                            Showcase
                                        </Link>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="hidden sm:flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">System Ready</span>
                                    </div>

                                    <div className="flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-gray-700">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        React 19 + Tailwind 3.4
                                    </div>
                                </div>

                                {/* Mobile menu button */}
                                <div className="md:hidden">
                                    <button className="text-gray-600 hover:text-gray-900 p-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Routes with Suspense */}
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            <Route path="/" element={<AIGeneratorDemo />} />
                            <Route path="/showcase" element={<ComponentShowcase />} />
                            <Route path="*" element={
                                <div className="min-h-screen flex items-center justify-center">
                                    <div className="text-center">
                                        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                                        <p className="text-gray-600 mb-8">Page not found</p>
                                        <Link
                                            to="/"
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Go Home
                                        </Link>
                                    </div>
                                </div>
                            } />
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </ErrorBoundary>
    );
};

export default App;
