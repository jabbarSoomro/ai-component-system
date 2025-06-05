import { ComponentRegistry } from '../registry/ComponentRegistry';
import { ComponentMetadata } from '../types/component';

export interface GenerationPrompt {
    intent: string;
    industry?: string;
    style?: string;
    layout?: string;
    sections?: string[];
    requirements?: string[];
    tone?: 'professional' | 'casual' | 'bold' | 'minimal' | 'creative';
    animation?: boolean;
    responsive?: boolean;
}

export interface GeneratedLayout {
    sections: Array<{
        componentId: string;
        props: Record<string, any>;
        order: number;
    }>;
    theme: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        accent: string;
    };
    metadata: {
        title: string;
        description: string;
        industry: string;
        style: string;
        generatedAt: string;
        prompt: GenerationPrompt;
    };
}

export class ComponentGenerator {
    private static themeTemplates = {
        minimal: {
            primary: '#000000',
            secondary: '#6B7280',
            background: '#FFFFFF',
            text: '#111827',
            accent: '#3B82F6'
        },
        bold: {
            primary: '#DC2626',
            secondary: '#F59E0B',
            background: '#FFFFFF',
            text: '#111827',
            accent: '#EC4899'
        },
        dark: {
            primary: '#8B5CF6',
            secondary: '#06B6D4',
            background: '#111827',
            text: '#F9FAFB',
            accent: '#10B981'
        },
        professional: {
            primary: '#1F2937',
            secondary: '#6B7280',
            background: '#F9FAFB',
            text: '#111827',
            accent: '#3B82F6'
        },
        creative: {
            primary: '#EC4899',
            secondary: '#8B5CF6',
            background: '#FFFFFF',
            text: '#111827',
            accent: '#06B6D4'
        }
    };

    private static industryMappings = {
        'saas': ['Technology', 'SaaS', 'Business'],
        'ecommerce': ['E-commerce', 'Retail', 'Business'],
        'agency': ['Marketing', 'Creative', 'Agency'],
        'portfolio': ['Creative', 'Photography', 'Personal'],
        'blog': ['Publishing', 'Content', 'Personal'],
        'corporate': ['Corporate', 'Business', 'Professional'],
        'startup': ['Technology', 'Startup', 'Business'],
        'nonprofit': ['Nonprofit', 'Community', 'Social'],
        'education': ['Education', 'Learning', 'Academic'],
        'healthcare': ['Healthcare', 'Medical', 'Wellness']
    };

    private static contentTemplates = {
        'saas': {
            heroTitle: 'Transform Your Business with Our Platform',
            heroSubtitle: 'Powerful Tools',
            heroDescription: 'Streamline your workflow and boost productivity with our comprehensive platform designed for modern businesses.',
            ctaText: 'Start Free Trial',
            features: [
                { title: 'Advanced Analytics', description: 'Get deep insights into your data with powerful analytics tools.' },
                { title: 'Team Collaboration', description: 'Work together seamlessly with integrated collaboration features.' },
                { title: 'Security First', description: 'Enterprise-grade security to keep your data safe and compliant.' }
            ]
        },
        'ecommerce': {
            heroTitle: 'Shop the Latest Trends',
            heroSubtitle: 'Premium Quality',
            heroDescription: 'Discover premium products carefully curated for style, quality, and value. Shop with confidence.',
            ctaText: 'Shop Now',
            features: [
                { title: 'Premium Quality', description: 'Carefully curated products that meet the highest standards.' },
                { title: 'Fast Shipping', description: 'Quick and reliable delivery to your doorstep.' },
                { title: 'Easy Returns', description: 'Hassle-free returns within 30 days of purchase.' }
            ]
        },
        'agency': {
            heroTitle: 'Creative Solutions for Modern Brands',
            heroSubtitle: 'Creative Excellence',
            heroDescription: 'We create compelling digital experiences that connect brands with their audiences and drive results.',
            ctaText: 'Get Started',
            features: [
                { title: 'Brand Strategy', description: 'Comprehensive brand strategy and positioning.' },
                { title: 'Digital Design', description: 'Beautiful, functional design that converts.' },
                { title: 'Campaign Management', description: 'Full-service campaign planning and execution.' }
            ]
        }
    };

    static generateLayout(prompt: GenerationPrompt): GeneratedLayout {
        console.log('🤖 AI Generator: Starting layout generation', prompt);

        const components = this.selectComponents(prompt);
        const theme = this.generateTheme(prompt);

        const layout: GeneratedLayout = {
            sections: components.map((comp, index) => ({
                componentId: comp.metadata.id,
                props: this.generateProps(comp, prompt, theme),
                order: index
            })),
            theme,
            metadata: {
                title: this.generateTitle(prompt),
                description: this.generateDescription(prompt),
                industry: prompt.industry || 'business',
                style: prompt.tone || 'minimal',
                generatedAt: new Date().toISOString(),
                prompt
            }
        };

        console.log('✅ AI Generator: Layout generated successfully', layout);
        return layout;
    }

    private static selectComponents(prompt: GenerationPrompt): Array<{metadata: ComponentMetadata}> {
        const allComponents = Array.from(ComponentRegistry.getAllComponents().values());
        const industryTags = this.getIndustryTags(prompt.industry);

        console.log('🔍 AI Generator: Analyzing components', {
            totalComponents: allComponents.length,
            industryTags,
            requestedSections: prompt.sections
        });

        // Score components based on relevance
        const scoredComponents = allComponents.map(comp => ({
            ...comp,
            score: this.calculateRelevanceScore(comp.metadata, prompt, industryTags)
        }));

        // Sort by score
        scoredComponents.sort((a, b) => b.score - a.score);

        // Build layout based on common patterns
        const layout : any [] = [] ;

        // Always start with navigation if available
        const nav = scoredComponents.find(c => c.metadata.category === 'Navigation');
        if (nav) {
            layout.push(nav);
            console.log('📍 AI Generator: Added navigation component');
        }

        // Add hero section
        const hero = scoredComponents.find(c => c.metadata.category === 'Hero');
        if (hero) {
            layout.push(hero);
            console.log('🎯 AI Generator: Added hero component');
        }

        // Add requested sections or defaults
        const requestedSections = prompt.sections || ['Features', 'Testimonials', 'Pricing'];

        for (const sectionType of requestedSections) {
            const section = scoredComponents.find(c =>
                c.metadata?.category === sectionType && !layout.some(l => l.metadata?.id === c.metadata?.id)
            );
            if (section) {
                layout.push(section);
                console.log(`📦 AI Generator: Added ${sectionType} component`);
            }
        }

        // Always end with footer if available
        const footer = scoredComponents.find(c => c.metadata.category === 'Footer');
        if (footer) {
            layout.push(footer);
            console.log('🔚 AI Generator: Added footer component');
        }

        console.log(`🏗️ AI Generator: Final layout has ${layout.length} components`);
        return layout;
    }

    private static calculateRelevanceScore(
        metadata: ComponentMetadata,
        prompt: GenerationPrompt,
        industryTags: string[]
    ): number {
        let score = 0;

        // Industry relevance (high weight)
        const industryMatch = metadata.industryTags.some(tag =>
            industryTags.includes(tag)
        );
        if (industryMatch) score += 15;

        // Style/tone relevance (medium weight)
        if (prompt.tone && metadata.styleTags.includes(prompt.tone)) {
            score += 10;
        }

        // Layout preference (medium weight)
        if (prompt.layout && metadata.layoutType.toLowerCase().includes(prompt.layout.toLowerCase())) {
            score += 8;
        }

        // Feature requirements (low-medium weight)
        if (prompt.requirements) {
            if (prompt.requirements.includes('animation') && metadata.hasAnimation) score += 5;
            if (prompt.requirements.includes('form') && metadata.hasForm) score += 5;
            if (prompt.requirements.includes('image') && metadata.hasImage) score += 5;
        }

        // Animation preference
        if (prompt.animation !== false && metadata.hasAnimation) score += 3;

        // Responsive requirement
        if (prompt.responsive !== false && metadata.responsive) score += 2;

        // Intent keyword matching
        if (prompt.intent) {
            const intentLower = prompt.intent.toLowerCase();
            if (metadata.useCases.some(use => intentLower.includes(use.toLowerCase()))) score += 6;
            if (metadata.styleTags.some(tag => intentLower.includes(tag.toLowerCase()))) score += 4;
        }

        return score;
    }

    private static generateTheme(prompt: GenerationPrompt) {
        const tone = prompt.tone || 'minimal';
        let baseTheme = (this.themeTemplates as any)[tone] || this.themeTemplates.minimal;

        // Customize based on industry
        const industry = prompt.industry?.toLowerCase();

        switch (industry) {
            case 'healthcare':
                return { ...baseTheme, primary: '#059669', accent: '#06B6D4' };
            case 'finance':
                return { ...baseTheme, primary: '#1E40AF', accent: '#059669' };
            case 'creative':
            case 'agency':
                return { ...baseTheme, primary: '#EC4899', accent: '#8B5CF6' };
            case 'education':
                return { ...baseTheme, primary: '#7C3AED', accent: '#F59E0B' };
            case 'ecommerce':
                return { ...baseTheme, primary: '#DC2626', accent: '#059669' };
            case 'nonprofit':
                return { ...baseTheme, primary: '#059669', accent: '#3B82F6' };
            default:
                return baseTheme;
        }
    }

    private static generateProps(
        component: any,
        prompt: GenerationPrompt,
        theme: any
    ): Record<string, any> {
        const baseProps = {
            theme,
            animate: prompt.animation !== false
        };

        const industry = prompt.industry?.toLowerCase() || 'saas';
        const contentTemplate = (this.contentTemplates as any)[industry] || this.contentTemplates.saas;

        // Generate content based on component type and industry
        switch (component.metadata.category) {
            case 'Hero':
                return {
                    ...baseProps,
                    title: contentTemplate.heroTitle,
                    subtitle: contentTemplate.heroSubtitle,
                    description: contentTemplate.heroDescription,
                    primaryCta: {
                        text: contentTemplate.ctaText,
                        href: '#'
                    },
                    secondaryCta: {
                        text: 'Learn More',
                        href: '#'
                    },
                    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                };

            case 'Features':
                return {
                    ...baseProps,
                    title: 'Why Choose Us',
                    subtitle: 'Features',
                    description: 'Discover what makes our solution unique and powerful',
                    features: contentTemplate.features
                };

            case 'Testimonials':
                return {
                    ...baseProps,
                    title: 'What Our Customers Say',
                    subtitle: 'Testimonials',
                    testimonials: this.generateTestimonials(industry)
                };

            case 'Pricing':
                return {
                    ...baseProps,
                    title: 'Simple, Transparent Pricing',
                    subtitle: 'Pricing',
                    description: 'Choose the plan that fits your needs perfectly',
                    plans: this.generatePricingPlans(industry)
                };

            case 'Navigation':
                return {
                    ...baseProps,
                    logo: { text: 'Brand' },
                    menuItems: this.generateNavItems(industry),
                    cta: {
                        text: contentTemplate.ctaText,
                        href: '#'
                    }
                };

            case 'Footer':
                return {
                    ...baseProps,
                    logo: { text: 'Brand' },
                    description: 'Building the future of digital experiences with innovative solutions.',
                    sections: this.generateFooterSections(industry),
                    newsletter: {
                        title: 'Stay Updated',
                        description: 'Get the latest updates and exclusive content',
                        placeholder: 'Enter your email',
                        buttonText: 'Subscribe'
                    },
                    socialLinks: [
                        { name: 'Twitter', href: '#', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                        { name: 'Facebook', href: '#', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                        { name: 'LinkedIn', href: '#', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' }
                    ]
                };

            case 'CTA':
                return {
                    ...baseProps,
                    title: 'Ready to Get Started?',
                    description: 'Join thousands of satisfied customers and transform your business today.',
                    primaryButton: { text: contentTemplate.ctaText, href: '#' },
                    secondaryButton: { text: 'Learn More', href: '#' }
                };

            case 'Contact':
                return {
                    ...baseProps,
                    title: 'Get in Touch',
                    subtitle: 'Contact Us',
                    description: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
                    contactInfo: {
                        phone: '+1 (555) 123-4567',
                        email: 'hello@example.com',
                        address: '123 Business Street, Suite 100, City, State 12345'
                    }
                };

            case 'Newsletter':
                return {
                    ...baseProps,
                    title: 'Stay in the Loop',
                    description: 'Get exclusive updates, tips, and insights delivered straight to your inbox.',
                    placeholder: 'Enter your email address',
                    buttonText: 'Subscribe Now',
                    incentive: 'Get 20% off your first purchase!'
                };

            case 'Stats':
                return {
                    ...baseProps,
                    title: 'Our Impact in Numbers',
                    subtitle: 'Statistics',
                    stats: this.generateStats(industry)
                };

            case 'FAQ':
                return {
                    ...baseProps,
                    title: 'Frequently Asked Questions',
                    subtitle: 'FAQ',
                    description: 'Everything you need to know about our platform and services.',
                    faqs: this.generateFAQs(industry)
                };

            default:
                return baseProps;
        }
    }

    private static generateTestimonials(industry: string) {
        const testimonialTemplates = {
            'saas': [
                {
                    content: 'This platform has completely transformed how we manage our business operations. The automation features alone have saved us 20+ hours per week.',
                    author: { name: 'Sarah Johnson', title: 'CEO', company: 'TechStart Inc.' },
                    rating: 5
                },
                {
                    content: 'Outstanding customer support and incredible ROI. We saw results within the first month of implementation.',
                    author: { name: 'Michael Chen', title: 'Operations Director', company: 'GrowthCorp' },
                    rating: 5
                }
            ],
            'ecommerce': [
                {
                    content: 'Amazing product quality and lightning-fast shipping. This has become my go-to store for everything.',
                    author: { name: 'Emily Rodriguez', title: 'Marketing Manager', company: 'Creative Studio' },
                    rating: 5
                },
                {
                    content: 'The customer service is exceptional. They went above and beyond to ensure I was satisfied with my purchase.',
                    author: { name: 'David Park', title: 'Entrepreneur' },
                    rating: 5
                }
            ]
        };

        return (testimonialTemplates as any)[industry] || testimonialTemplates.saas;

    }

    private static generatePricingPlans(industry: string) {
        const pricingTemplates = {
            'saas': [
                {
                    name: 'Starter',
                    price: '$29',
                    period: 'month',
                    description: 'Perfect for small teams getting started',
                    features: [
                        { text: 'Up to 5 team members', included: true },
                        { text: 'Basic analytics', included: true },
                        { text: 'Email support', included: true },
                        { text: '10GB storage', included: true },
                        { text: 'Advanced features', included: false }
                    ],
                    cta: { text: 'Start Free Trial', href: '#' }
                },
                {
                    name: 'Professional',
                    price: '$99',
                    period: 'month',
                    description: 'For growing businesses',
                    features: [
                        { text: 'Up to 25 team members', included: true },
                        { text: 'Advanced analytics', included: true },
                        { text: 'Priority support', included: true },
                        { text: '100GB storage', included: true },
                        { text: 'Custom integrations', included: true }
                    ],
                    cta: { text: 'Start Free Trial', href: '#' },
                    popular: true
                },
                {
                    name: 'Enterprise',
                    price: '$299',
                    period: 'month',
                    description: 'For large organizations',
                    features: [
                        { text: 'Unlimited team members', included: true },
                        { text: 'Enterprise analytics', included: true },
                        { text: 'Dedicated support', included: true },
                        { text: '1TB storage', included: true },
                        { text: 'Advanced security', included: true }
                    ],
                    cta: { text: 'Contact Sales', href: '#' }
                }
            ]
        };

        return (pricingTemplates as any)[industry] || pricingTemplates.saas;
    }

    private static generateStats(industry: string) {
        const statsTemplates = {
            'saas': [
                { value: '50K+', label: 'Active Users', suffix: '' },
                { value: '99.9', label: 'Uptime', suffix: '%' },
                { value: '24/7', label: 'Support', suffix: '' },
                { value: '150+', label: 'Countries', suffix: '' }
            ],
            'ecommerce': [
                { value: '1M+', label: 'Happy Customers', suffix: '' },
                { value: '4.9', label: 'Average Rating', suffix: '/5' },
                { value: '24h', label: 'Fast Shipping', suffix: '' },
                { value: '30', label: 'Day Returns', suffix: '' }
            ]
        };

        return (statsTemplates as any)[industry] || statsTemplates.saas;
    }

    private static generateFAQs(industry: string) {
        const faqTemplates = {
            'saas': [
                {
                    question: 'How do I get started with your platform?',
                    answer: 'Simply sign up for a free account and follow our step-by-step onboarding process. Our team is here to help you every step of the way.'
                },
                {
                    question: 'Is there a free trial available?',
                    answer: 'Yes! We offer a 14-day free trial with no credit card required. You can explore all features and see how our platform fits your needs.'
                },
                {
                    question: 'Can I cancel my subscription anytime?',
                    answer: 'Absolutely. You can cancel your subscription at any time from your account settings. There are no cancellation fees or long-term commitments.'
                }
            ]
        };

        return (faqTemplates as any)[industry] || faqTemplates.saas;
    }

    private static getIndustryTags(industry?: string): string[] {
        return (this.industryMappings as any)[industry?.toLowerCase() || 'business'] || ['Business'];
    }

    private static generateTitle(prompt: GenerationPrompt): string {
        const industryTitles = {
            'saas': 'SaaS Platform',
            'ecommerce': 'Online Store',
            'agency': 'Creative Agency',
            'portfolio': 'Portfolio',
            'blog': 'Blog',
            'corporate': 'Corporate Website',
            'startup': 'Startup',
            'nonprofit': 'Nonprofit Organization',
            'education': 'Educational Platform',
            'healthcare': 'Healthcare Solutions'
        };

        return (industryTitles as any)[prompt.industry?.toLowerCase() || 'saas'] || 'Website';
    }

    private static generateDescription(prompt: GenerationPrompt): string {
        return `A ${prompt.tone || 'modern'} ${prompt.industry || 'business'} website designed to ${prompt.intent || 'engage users and drive conversions'}.`;
    }

    private static generateNavItems(industry: string) {
        const navTemplates = {
            'saas': [
                { label: 'Features', href: '#features' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' }
            ],
            'ecommerce': [
                { label: 'Shop', href: '#shop' },
                { label: 'Categories', href: '#categories' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' }
            ],
            'agency': [
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' }
            ]
        };

        return (navTemplates as any)[industry] || navTemplates.saas;
    }

    private static generateFooterSections(industry: string) {
        const footerTemplates = {
            'saas': [
                {
                    title: 'Product',
                    links: [
                        { label: 'Features', href: '#' },
                        { label: 'Pricing', href: '#' },
                        { label: 'Security', href: '#' },
                        { label: 'Roadmap', href: '#' }
                    ]
                },
                {
                    title: 'Company',
                    links: [
                        { label: 'About', href: '#' },
                        { label: 'Blog', href: '#' },
                        { label: 'Careers', href: '#' },
                        { label: 'Contact', href: '#' }
                    ]
                },
                {
                    title: 'Support',
                    links: [
                        { label: 'Help Center', href: '#' },
                        { label: 'Documentation', href: '#' },
                        { label: 'Community', href: '#' },
                        { label: 'Status', href: '#' }
                    ]
                }
            ]
        };

        return (<any>footerTemplates)[industry] || footerTemplates.saas;
    }
}

