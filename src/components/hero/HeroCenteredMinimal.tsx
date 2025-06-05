import React from 'react';
import { motion } from 'framer-motion';
import { HeroProps } from '../../types/component';
import { ComponentMetadata } from '../../types/component';

const HeroCenteredMinimal: React.FC<HeroProps> = ({
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const Container = animate ? motion.div : 'div';
    const Item = animate ? motion.div : 'div';

    return (
        <Container
            className="min-h-screen flex items-center justify-center px-4 bg-white"
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
            style={{
                backgroundColor: theme?.background || undefined,
                color: theme?.text || undefined
            }}
        >
            <div className="max-w-4xl mx-auto text-center">
                {subtitle && (
                    <Item
                        className="text-sm font-medium text-gray-600 mb-4 tracking-wide uppercase"
                        variants={animate ? itemVariants : undefined}
                    >
                        {subtitle}
                    </Item>
                )}

                <Item
                    className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                    variants={animate ? itemVariants : undefined}
                    style={{ color: theme?.primary || undefined }}
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
                            className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                            style={{ backgroundColor: theme?.primary || undefined }}
                        >
                            {primaryCta.text}
                        </a>
                    )}
                    {secondaryCta && (
                        <a
                            href={secondaryCta.href}
                            className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            style={{
                                borderColor: theme?.secondary || undefined,
                                color: theme?.secondary || undefined
                            }}
                        >
                            {secondaryCta.text}
                        </a>
                    )}
                </Item>

                {image && (
                    <Item
                        className="rounded-2xl overflow-hidden shadow-2xl"
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


export default HeroCenteredMinimal;
