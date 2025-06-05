import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StatsProps } from '../../types/stats';

const StatsGridMinimal: React.FC<StatsProps> = ({
                                                    title,
                                                    subtitle,
                                                    description,
                                                    stats,
                                                    animate = false,
                                                    countUp = true,
                                                    showTrends = false,
                                                    theme,
                                                    className,
                                                    'data-testid': testId
                                                }) => {
    const [animatedValues, setAnimatedValues] = useState<Record<number, number>>({});

    useEffect(() => {
        if (countUp) {
            stats.forEach((stat, index) => {
                const numericValue = typeof stat.value === 'number' ? stat.value :
                    parseInt(stat.value.toString().replace(/[^\d]/g, ''));

                if (!isNaN(numericValue)) {
                    let current = 0;
                    const increment = numericValue / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            current = numericValue;
                            clearInterval(timer);
                        }
                        setAnimatedValues(prev => ({ ...prev, [index]: Math.floor(current) }));
                    }, 30);
                }
            });
        }
    }, [stats, countUp]);

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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const Container = animate ? motion.section : 'section';
    const Item = animate ? motion.div : 'div';

    return (
        <Container
            className={`py-16 px-4 bg-gray-50 ${className || ''}`}
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
            data-testid={testId}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-12">
                        {subtitle && (
                            <div
                                className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4"
                                style={{ color: theme?.primary || undefined }}
                            >
                                {subtitle}
                            </div>
                        )}
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 text-balance">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <Item
                            key={index}
                            className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
                            variants={animate ? itemVariants : undefined}
                        >
                            {stat.icon && (
                                <div
                                    className="w-12 h-12 mx-auto mb-4 text-blue-600"
                                    style={{ color: theme?.primary || stat.color || undefined }}
                                >
                                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={stat.icon} />
                                    </svg>
                                </div>
                            )}

                            <div
                                className="text-4xl font-bold text-gray-900 mb-2"
                                style={{ color: stat.color || theme?.primary || undefined }}
                            >
                                {stat.prefix || ''}
                                {countUp && typeof stat.value === 'number'
                                    ? animatedValues[index] || 0
                                    : stat.value
                                }
                                {stat.suffix || ''}
                            </div>

                            <div className="text-lg font-semibold text-gray-700 mb-2">
                                {stat.label}
                            </div>

                            {stat.description && (
                                <div className="text-sm text-gray-500 mb-4">
                                    {stat.description}
                                </div>
                            )}

                            {/* Trend Indicator */}
                            {showTrends && stat.trend && (
                                <div className={`flex items-center justify-center text-sm ${
                                    stat.trend.direction === 'up' ? 'text-green-600' :
                                        stat.trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
                                }`}>
                                    {stat.trend.direction === 'up' && (
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {stat.trend.direction === 'down' && (
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {stat.trend.value}% {stat.trend.period}
                                </div>
                            )}
                        </Item>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default StatsGridMinimal;
