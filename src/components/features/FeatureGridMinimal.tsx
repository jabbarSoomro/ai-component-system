import React from 'react';
import { motion } from 'framer-motion';
import { FeatureProps } from '../../types/feature';

const FeatureGridMinimal: React.FC<FeatureProps> = ({
                                                        title,
                                                        subtitle,
                                                        description,
                                                        features,
                                                        columns = 3,
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
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const Container = animate ? motion.section : 'section';
    const Item = animate ? motion.div : 'div';

    return (
        <Container
            className={`py-16 px-4 bg-white ${className || ''}`}
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
            data-testid={testId}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    {subtitle && (
                        <Item
                            className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4"
                            variants={animate ? itemVariants : undefined}
                            style={{ color: theme?.primary || undefined }}
                        >
                            {subtitle}
                        </Item>
                    )}
                    {title && (
                        <Item
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance"
                            variants={animate ? itemVariants : undefined}
                        >
                            {title}
                        </Item>
                    )}
                    {description && (
                        <Item
                            className="text-lg text-gray-600 max-w-3xl mx-auto text-balance"
                            variants={animate ? itemVariants : undefined}
                        >
                            {description}
                        </Item>
                    )}
                </div>

                {/* Features Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8`}>
                    {features.map((feature, index) => (
                        <Item
                            key={index}
                            className="text-center group"
                            variants={animate ? itemVariants : undefined}
                        >
                            {feature.icon && (
                                <div
                                    className="w-12 h-12 mx-auto mb-6 text-blue-600"
                                    style={{ color: theme?.primary || undefined }}
                                >
                                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={feature.icon} />
                                    </svg>
                                </div>
                            )}

                            {feature.image && (
                                <div className="mb-6">
                                    <img
                                        src={feature.image.src}
                                        alt={feature.image.alt}
                                        className="w-full h-48 object-cover rounded-lg"
                                        loading="lazy"
                                    />
                                </div>
                            )}

                            {feature.badge && (
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
            {feature.badge}
            </span>
                            )}

                            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-balance">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed text-balance">
                                {feature.description}
                            </p>

                            {feature.link && (
                                <div className="mt-4">
                                    <a
                                        href={feature.link.href}
                                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center transition-colors"
                                        style={{ color: theme?.primary || undefined }}
                                    >
                                        {feature.link.text}
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            )}

                            {feature.stats && (
                                <div className="mt-6 flex justify-center space-x-6">
                                    {feature.stats.map((stat, statIndex) => (
                                        <div key={statIndex} className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                            <div className="text-sm text-gray-600">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Item>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default FeatureGridMinimal;