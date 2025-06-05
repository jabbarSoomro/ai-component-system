import React from 'react';
import { motion } from 'framer-motion';
import { FeatureProps } from '../../types/feature';

const FeatureAlternatingBold: React.FC<FeatureProps> = ({
                                                            title,
                                                            subtitle,
                                                            features,
                                                            theme,
                                                            animate = false,
                                                            className,
                                                            'data-testid': testId
                                                        }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.3
            }
        }
    };

    const leftVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    };

    const rightVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    };

    const Container = animate ? motion.section : 'section';
    const Item = animate ? motion.div : 'div';

    return (
        <Container
            className={`py-20 px-4 bg-gray-50 ${className || ''}`}
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
            data-testid={testId}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    {subtitle && (
                        <div
                            className="text-sm font-bold text-orange-600 tracking-wide uppercase mb-4"
                            style={{ color: theme?.primary || undefined }}
                        >
                            {subtitle}
                        </div>
                    )}
                    {title && (
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-balance">
                            {title}
                        </h2>
                    )}
                </div>

                {/* Alternating Features */}
                <div className="space-y-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                            }`}
                        >
                            <Item
                                className={index % 2 === 1 ? 'lg:col-start-2' : ''}
                                variants={animate ? (index % 2 === 0 ? leftVariants : rightVariants) : undefined}
                            >
                                <div className="space-y-6">
                                    {feature.badge && (
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-orange-100 text-orange-800"
                                            style={{
                                                backgroundColor: theme?.primary ? `${theme.primary}20` : undefined,
                                                color: theme?.primary || undefined
                                            }}
                                        >
  {feature.badge}
  </span>
                                    )}

                                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 text-balance">
                                        {feature.title}
                                    </h3>

                                    <p className="text-xl text-gray-600 leading-relaxed text-balance">
                                        {feature.description}
                                    </p>

                                    {feature.link && (
                                        <a
                                            href={feature.link.href}
                                            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-bold transition-colors"
                                            style={{ color: theme?.primary || undefined }}
                                        >
                                            {feature.link.text}
                                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </Item>

                            <Item
                                className={index % 2 === 1 ? 'lg:col-start-1' : ''}
                                variants={animate ? (index % 2 === 0 ? rightVariants : leftVariants) : undefined}
                            >
                                {feature.image && (
                                    <div className="relative">
                                        <div
                                            className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl transform rotate-3"
                                            style={{
                                                background: theme?.primary ?
                                                    `linear-gradient(to right, ${theme.primary}, ${theme.accent || theme.primary})` :
                                                    undefined
                                            }}
                                        ></div>
                                        <img
                                            src={feature.image.src}
                                            alt={feature.image.alt}
                                            className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </Item>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default FeatureAlternatingBold;