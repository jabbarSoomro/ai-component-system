import React from 'react';
import { motion } from 'framer-motion';
import { HeroProps } from '../../types/component';

const HeroCenteredGradient: React.FC<HeroProps> = ({
                                                       title,
                                                       subtitle,
                                                       description,
                                                       primaryCta,
                                                       secondaryCta,
                                                       image,
                                                       badge,
                                                       theme,
                                                       animate = false
                                                   }) => {
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.7,
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const Container = animate ? motion.div : 'div';
    const Item = animate ? motion.div : 'div';

    return (
        <Container
            className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {badge && (
                    <Item
                        className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm border mb-6"
                        variants={animate ? itemVariants : undefined}
                    >
                        ✨ {badge}
                    </Item>
                )}

                {subtitle && (
                    <Item
                        className="text-sm font-semibold text-indigo-600 mb-4 tracking-wide uppercase"
                        variants={animate ? itemVariants : undefined}
                    >
                        {subtitle}
                    </Item>
                )}

                <Item
                    className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent"
                    variants={animate ? itemVariants : undefined}
                >
                    {title}
                </Item>

                {description && (
                    <Item
                        className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
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
                            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl"
                        >
                            {primaryCta.text}
                        </a>
                    )}
                    {secondaryCta && (
                        <a
                            href={secondaryCta.href}
                            className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white transition-all font-semibold shadow-lg border"
                        >
                            {secondaryCta.text}
                        </a>
                    )}
                </Item>

                {image && (
                    <Item
                        className="relative"
                        variants={animate ? itemVariants : undefined}
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl"></div>
                        <img
                            src={image}
                            alt="Hero"
                            className="relative z-10 w-full h-auto rounded-2xl shadow-2xl border border-white/20"
                        />
                    </Item>
                )}
            </div>
        </Container>
    );
};



export default HeroCenteredGradient;
