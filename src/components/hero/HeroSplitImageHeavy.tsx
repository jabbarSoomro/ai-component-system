import { ComponentMetadata } from '../../types/component';
import React from 'react';
import { motion } from 'framer-motion';
import { HeroProps } from '../../types/component';
const HeroSplitImageHeavy: React.FC<HeroProps> = ({
                                                      title,
                                                      subtitle,
                                                      description,
                                                      primaryCta,
                                                      image,
                                                      theme,
                                                      animate = false
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
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
    };

    const rightVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    };

    const Container = animate ? motion.div : 'div';
    const LeftItem = animate ? motion.div : 'div';
    const RightItem = animate ? motion.div : 'div';

    return (
        <Container
            className="min-h-screen grid grid-cols-1 lg:grid-cols-2"
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
        >
            <LeftItem
                className="flex items-center justify-center px-8 lg:px-16 py-16 bg-gray-50"
                variants={animate ? leftVariants : undefined}
            >
                <div className="max-w-lg">
                    {subtitle && (
                        <div className="text-sm font-medium text-green-600 mb-4 tracking-wide">
                            {subtitle}
                        </div>
                    )}

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {description}
                        </p>
                    )}

                    {primaryCta && (
                        <a
                            href={primaryCta.href}
                            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                        >
                            {primaryCta.text}
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    )}
                </div>
            </LeftItem>

            <RightItem
                className="relative overflow-hidden"
                variants={animate ? rightVariants : undefined}
            >
                {image && (
                    <img
                        src={image}
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </RightItem>
        </Container>
    );
};



export default HeroSplitImageHeavy;