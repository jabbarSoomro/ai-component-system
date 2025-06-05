import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ComponentRegistry from '../../registry/ExtendedComponentRegistry';

const ComponentShowcase: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedTone, setSelectedTone] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const allComponents = Array.from(ComponentRegistry.getAllComponents().entries());

    const categories = ['All', ...new Set(allComponents.map(([_, comp]) => comp.metadata.category))];
    const tones = ['All', ...new Set(allComponents.map(([_, comp]) => comp.metadata.tone))];

    const filteredComponents = useMemo(() => {
        return allComponents.filter(([_, comp]) => {
            const matchesCategory = selectedCategory === 'All' || comp.metadata.category === selectedCategory;
            const matchesTone = selectedTone === 'All' || comp.metadata.tone === selectedTone;
            const matchesSearch = searchQuery === '' ||
                comp.metadata.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                comp.metadata.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                comp.metadata.useCases.some(use => use.toLowerCase().includes(searchQuery.toLowerCase())) ||
                comp.metadata.styleTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesCategory && matchesTone && matchesSearch;
        });
    }, [allComponents, selectedCategory, selectedTone, searchQuery]);

    const renderComponentPreview = (componentId: string) => {
        const registeredComponent = ComponentRegistry.getComponent(componentId);
        if (!registeredComponent) return null;

        const Component = registeredComponent.component;
        const metadata = registeredComponent.metadata;

        // Generate sample props based on component type
        const sampleProps = generateSampleProps(metadata.category);

        return (
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">{metadata.id}</h3>
                            <p className="text-sm text-gray-600">
                                {metadata.category} • {metadata.layoutType} • {metadata.tone}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            {metadata.hasAnimation && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  Animated
                  </span>
                            )}
                            {metadata.hasForm && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            Form
            </span>
                            )}
                            {metadata.responsive && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
            Responsive
            </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Component Preview */}
                <div className="relative bg-gray-50" style={{ height: '300px' }}>
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="transform scale-50 origin-top-left" style={{ width: '200%', height: '200%' }}>
                            <Component {...sampleProps} animate={false} />
                        </div>
                    </div>

                    {/* Overlay with View Button */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                        <button className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium shadow-lg transform scale-95 hover:scale-100 transition-transform">
                            View Full Size
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const generateSampleProps = (category: string): Record<string, any> => {
        const commonProps = {
            theme: {
                primary: '#3B82F6',
                secondary: '#6B7280',
                background: '#FFFFFF',
                text: '#111827',
                accent: '#10B981'
            },
            animate: false
        };

        switch (category) {
            case 'Hero':
                return {
                    ...commonProps,
                    title: 'Welcome to Our Platform',
                    subtitle: 'Innovation',
                    description: 'Transform your business with our cutting-edge solution.',
                    primaryCta: { text: 'Get Started', href: '#' },
                    secondaryCta: { text: 'Learn More', href: '#' }
                };

            case 'Navigation':
                return {
                    ...commonProps,
                    logo: { text: 'Brand' },
                    menuItems: [
                        { label: 'Features', href: '#' },
                        { label: 'Pricing', href: '#' },
                        { label: 'About', href: '#' }
                    ],
                    cta: { text: 'Sign Up', href: '#' }
                };

            case 'Footer':
                return {
                    ...commonProps,
                    logo: { text: 'Brand' },
                    description: 'Building the future of digital experiences.',
                    sections: [
                        {
                            title: 'Product',
                            links: [
                                { label: 'Features', href: '#' },
                                { label: 'Pricing', href: '#' }
                            ]
                        }
                    ],
                    newsletter: {
                        title: 'Stay Updated',
                        description: 'Get the latest news',
                        placeholder: 'Enter email',
                        buttonText: 'Subscribe'
                    }
                };

            case 'Features':
                return {
                    ...commonProps,
                    title: 'Amazing Features',
                    subtitle: 'What We Offer',
                    description: 'Discover what makes us special.',
                    features: [
                        {
                            title: 'Fast Performance',
                            description: 'Lightning-fast loading times.'
                        },
                        {
                            title: 'Secure Platform',
                            description: 'Enterprise-grade security.'
                        },
                        {
                            title: '24/7 Support',
                            description: 'Round-the-clock support.'
                        }
                    ]
                };

            case 'Testimonials':
                return {
                    ...commonProps,
                    title: 'What Our Customers Say',
                    subtitle: 'Testimonials',
                    testimonials: [
                        {
                            content: 'This platform has transformed our business.',
                            author: {
                                name: 'Sarah Johnson',
                                title: 'CEO',
                                company: 'TechCorp'
                            },
                            rating: 5
                        }
                    ]
                };

            case 'Pricing':
                return {
                    ...commonProps,
                    title: 'Simple Pricing',
                    subtitle: 'Choose Your Plan',
                    plans: [
                        {
                            name: 'Starter',
                            price: '$29',
                            period: 'month',
                            description: 'Perfect for small teams',
                            features: [
                                { text: '5 team members', included: true },
                                { text: 'Basic support', included: true }
                            ],
                            cta: { text: 'Get Started', href: '#' }
                        }
                    ]
                };

            case 'CTA':
                return {
                    ...commonProps,
                    title: 'Ready to Get Started?',
                    description: 'Join thousands of satisfied customers.',
                    primaryButton: { text: 'Start Free Trial', href: '#' },
                    secondaryButton: { text: 'Learn More', href: '#' }
                };

            case 'Contact':
                return {
                    ...commonProps,
                    title: 'Get in Touch',
                    subtitle: 'Contact Us',
                    description: 'We\'d love to hear from you.',
                    contactInfo: {
                        phone: '+1 (555) 123-4567',
                        email: 'hello@example.com',
                        address: '123 Business St, City, State 12345'
                    }
                };

            case 'Newsletter':
                return {
                    ...commonProps,
                    title: 'Stay in the Loop',
                    description: 'Get updates delivered to your inbox.',
                    placeholder: 'Enter your email',
                    buttonText: 'Subscribe'
                };

            case 'Stats':
                return {
                    ...commonProps,
                    title: 'Our Impact',
                    subtitle: 'By the Numbers',
                    stats: [
                        { value: '10K+', label: 'Happy Customers' },
                        { value: '99.9%', label: 'Uptime' },
                        { value: '24/7', label: 'Support' },
                        { value: '150+', label: 'Countries' }
                    ]
                };

            case 'FAQ':
                return {
                    ...commonProps,
                    title: 'Frequently Asked Questions',
                    subtitle: 'FAQ',
                    faqs: [
                        {
                            question: 'How do I get started?',
                            answer: 'Simply sign up for a free account.'
                        },
                        {
                            question: 'Is there a free trial?',
                            answer: 'Yes, we offer a 14-day free trial.'
                        }
                    ]
                };

            default:
                return commonProps;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Component Showcase</h1>
                <p className="text-lg text-gray-600">
                    Explore all {allComponents.length} components in our AI-powered system.
                </p>
            </div>

            {/* Filters */}
            <div className="mb-8 space-y-4">
                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search components..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Category and Tone Filters */}
                <div className="flex flex-wrap gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                        <select
                            value={selectedTone}
                            onChange={(e) => setSelectedTone(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {tones.map(tone => (
                                <option key={tone} value={tone}>
                                    {tone}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing {filteredComponents.length} of {allComponents.length} components
                </p>
            </div>

            {/* Component Grid */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                layout
            >
                {filteredComponents.map(([componentId, registeredComponent]) => (
                    <motion.div
                        key={componentId}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="space-y-4"
                    >
                        {renderComponentPreview(componentId)}

                        {/* Metadata */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-3">Component Details</h4>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="font-medium text-gray-600">Style Tags:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {registeredComponent.metadata.styleTags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
        {tag}
        </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Use Cases:</span>
                                    <p className="text-gray-700 mt-1">
                                        {registeredComponent.metadata.useCases.join(', ')}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Industries:</span>
                                    <p className="text-gray-700 mt-1">
                                        {registeredComponent.metadata.industryTags.join(', ')}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Content Variants:</span>
                                    <p className="text-gray-700 mt-1">
                                        {registeredComponent.metadata.contentVariants.join(', ')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {filteredComponents.length === 0 && (
                <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.5a7.962 7.962 0 01-5.207-1.209c-2.115-1.886-2.588-4.651-.749-6.49a5.006 5.006 0 0111.964 0c1.839 1.839 1.366 4.604-.749 6.49z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No components found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
            )}

            {/* Statistics */}
            <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">System Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                            {allComponents.length}
                        </div>
                        <div className="text-gray-600">Total Components</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                            {categories.length - 1}
                        </div>
                        <div className="text-gray-600">Categories</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                            {allComponents.filter(([_, comp]) => comp.metadata.hasAnimation).length}
                        </div>
                        <div className="text-gray-600">Animated</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                            {allComponents.filter(([_, comp]) => comp.metadata.responsive).length}
                        </div>
                        <div className="text-gray-600">Responsive</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentShowcase;