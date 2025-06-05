import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useComponentGeneration } from '../../hooks/useComponentGeneration';
import { ComponentRenderer } from '../../utils/ComponentRenderer';
import { GenerationPrompt } from '../../ai/ComponentGenerator';

const AIGeneratorDemo: React.FC = () => {
    const { generateLayout, clearLayout, isGenerating, generatedLayout, error } = useComponentGeneration();
    const [prompt, setPrompt] = useState<GenerationPrompt>({
        intent: 'Create a modern SaaS landing page',
        industry: 'saas',
        tone: 'minimal',
        sections: ['Features', 'Testimonials', 'Pricing'],
        animation: true,
        responsive: true
    });

    const [showCode, setShowCode] = useState(false);

    const handleGenerate = () => {
        generateLayout(prompt);
    };

    const handleSectionToggle = (section: string) => {
        const newSections = prompt.sections?.includes(section)
            ? prompt.sections.filter(s => s !== section)
            : [...(prompt.sections || []), section];
        setPrompt({ ...prompt, sections: newSections });
    };

    const availableSections = [
        'Features', 'Testimonials', 'Pricing', 'Stats', 'FAQ', 'Contact', 'Newsletter'
    ];

    const industries = [
        { value: 'saas', label: 'SaaS & Software' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'agency', label: 'Creative Agency' },
        { value: 'portfolio', label: 'Portfolio' },
        { value: 'blog', label: 'Blog & Media' },
        { value: 'corporate', label: 'Corporate' },
        { value: 'startup', label: 'Startup' },
        { value: 'nonprofit', label: 'Nonprofit' },
        { value: 'education', label: 'Education' },
        { value: 'healthcare', label: 'Healthcare' }
    ];

    const tones = [
        { value: 'minimal', label: 'Minimal & Clean' },
        { value: 'bold', label: 'Bold & Striking' },
        { value: 'dark', label: 'Dark & Modern' },
        { value: 'professional', label: 'Professional' },
        { value: 'creative', label: 'Creative & Playful' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Control Panel */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto p-6">
    <div className="flex items-center justify-between mb-6">
    <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Component Generator</h1>
    <p className="text-gray-600">Generate beautiful landing pages with AI</p>
    </div>

    {generatedLayout && (
        <div className="flex items-center space-x-3">
        <button
            onClick={() => setShowCode(!showCode)}
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center"
        >
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        {showCode ? 'Hide Code' : 'Show Code'}
        </button>

        <button
        onClick={clearLayout}
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
            Clear
            </button>
            </div>
    )}
    </div>

    {/* Form Controls */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {/* Industry */}
    <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
        <select
    value={prompt.industry}
    onChange={(e) => setPrompt({ ...prompt, industry: e.target.value })}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        {industries.map(industry => (
                <option key={industry.value} value={industry.value}>
            {industry.label}
            </option>
))}
    </select>
    </div>

    {/* Tone */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Design Tone</label>
    <select
    value={prompt.tone}
    onChange={(e) => setPrompt({ ...prompt, tone: e.target.value as any })}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        {tones.map(tone => (
                <option key={tone.value} value={tone.value}>
            {tone.label}
            </option>
))}
    </select>
    </div>

    {/* Animation Toggle */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Animation</label>
        <label className="flex items-center">
    <input
        type="checkbox"
    checked={prompt.animation}
    onChange={(e) => setPrompt({ ...prompt, animation: e.target.checked })}
    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span className="ml-2 text-sm text-gray-700">Enable animations</span>
    </label>
    </div>

    {/* Responsive Toggle */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Responsive</label>
        <label className="flex items-center">
    <input
        type="checkbox"
    checked={prompt.responsive}
    onChange={(e) => setPrompt({ ...prompt, responsive: e.target.checked })}
    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span className="ml-2 text-sm text-gray-700">Mobile optimized</span>
    </label>
    </div>
    </div>

    {/* Intent Input */}
    <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">Project Intent</label>
    <input
    type="text"
    value={prompt.intent}
    onChange={(e) => setPrompt({ ...prompt, intent: e.target.value })}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Describe your website goal..."
        />
        </div>

    {/* Section Selection */}
    <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">Include Sections</label>
    <div className="flex flex-wrap gap-2">
        {availableSections.map(section => (
                <button
                    key={section}
            onClick={() => handleSectionToggle(section)}
    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        prompt.sections?.includes(section)
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
>
    {section}
    </button>
))}
    </div>
    </div>

    {/* Generate Button */}
    <div className="flex gap-4">
    <button
        onClick={handleGenerate}
    disabled={isGenerating}
    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center"
        >
        {isGenerating ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
                </>
) : (
        <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    Generate Layout
    </>
)}
    </button>

    <button
    onClick={() => setPrompt({
        intent: 'Create a modern SaaS landing page',
        industry: 'saas',
        tone: 'minimal',
        sections: ['Features', 'Testimonials', 'Pricing'],
        animation: true,
        responsive: true
    })}
    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
        Reset
        </button>
        </div>

    {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
            </div>
    )}
    </div>
    </div>

    {/* Generated Layout */}
    {generatedLayout && (
        <div className="relative">
            {/* Layout Info Overlay */}
            <div className="absolute top-4 right-4 z-50">
    <motion.div
        className="bg-white rounded-lg shadow-lg p-4 max-w-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
    >
        <h3 className="font-semibold text-gray-900 mb-2">Generated Layout</h3>
    <div className="space-y-1 text-sm text-gray-600">
        <p><strong>Industry:</strong> {generatedLayout.metadata.industry}</p>
    <p><strong>Style:</strong> {generatedLayout.metadata.style}</p>
    <p><strong>Sections:</strong> {generatedLayout.sections.length}</p>
    <div className="flex flex-wrap gap-1 mt-2">
        {generatedLayout.sections.map((section : any, index : any) => (
                <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
            {section.componentId}
            </span>
    ))}
        </div>
        </div>
        </motion.div>
        </div>

        {/* Code View */}
        {showCode && (
            <div className="bg-gray-900 text-white p-6 border-b">
            <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Generated Configuration</h3>
        <button
            onClick={() => navigator.clipboard.writeText(JSON.stringify(generatedLayout, null, 2))}
            className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-600"
                >
                Copy JSON
        </button>
        </div>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm">
            <code>{JSON.stringify(generatedLayout, null, 2)}</code>
            </pre>
            </div>
            </div>
        )}

        {/* Rendered Components */}
        <ComponentRenderer layout={generatedLayout} />
    </div>
    )}

    {/* Welcome Screen */}
    {!generatedLayout && !isGenerating && (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
        AI-Powered Component Generation
    </h2>

    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Describe your vision and watch as our AI creates beautiful, responsive components
        tailored to your industry and design preferences.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Production Ready</h3>
    <p className="text-gray-600 text-sm">
        All components are fully responsive, accessible, and production-ready.
    </p>
    </div>

    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Multiple Variants</h3>
    <p className="text-gray-600 text-sm">
        Choose from thousands of component variations and style combinations.
    </p>
    </div>

    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Customizable</h3>
        <p className="text-gray-600 text-sm">
        Easy to customize themes, colors, and content to match your brand.
    </p>
    </div>
    </div>

    <p className="text-gray-500 text-sm">
        Configure your preferences above and click "Generate Layout" to get started.
    </p>
    </motion.div>
    </div>
    )}
    </div>
);
};

export default AIGeneratorDemo;
