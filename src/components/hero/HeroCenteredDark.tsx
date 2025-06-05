import React from 'react';
import { motion } from 'framer-motion';
import { HeroProps } from '../../types/component';

const HeroCenteredDark: React.FC<HeroProps> = ({
                                                   title,
                                                   subtitle,
                                                   description,
                                                   primaryCta,
                                                   secondaryCta,
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

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const Container = animate ? motion.div : 'div';
    const Item = animate ? motion.div : 'div';

    return (
        <Container
            className="min-h-screen flex items-center justify-center px-4 bg-gray-900 text-white relative overflow-hidden"
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {subtitle && (
                    <Item
                        className="text-sm font-medium text-purple-400 mb-4 tracking-wide uppercase"
                        variants={animate ? itemVariants : undefined}
                    >
                        {subtitle}
                    </Item>
                )}

                <Item
                    className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    variants={animate ? itemVariants : undefined}
                >
                    {title}
                </Item>

                {description && (
                    <Item
                        className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                        variants={animate ? itemVariants : undefined}
                    >
                        {description}
                    </Item>
                )}

                <Item
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    variants={animate ? itemVariants : undefined}
                >
                    {primaryCta && (
                        <a
                            href={primaryCta.href}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium shadow-lg transform hover:scale-105"
                        >
                            {primaryCta.text}
                        </a>
                    )}
                    {secondaryCta && (
                        <a
                            href={secondaryCta.href}
                            className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all font-medium"
                        >
                            {secondaryCta.text}
                        </a>
                    )}
                </Item>

                {image && (
                    <Item
                        className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
                        variants={animate ? itemVariants : undefined}
                    >
                        <img
                            src={image}
                            alt="Hero"
                            className="w-full h-auto"
                        />
                    </Item>
                )}
            </div>
        </Container>
    );
};


export default HeroCenteredDark;