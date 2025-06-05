import React from 'react';
import { motion } from 'framer-motion';
import { HeroProps } from '../../types/component';
import { ComponentMetadata } from '../../types/component';

/* <<<<<<<<<<<<<<  ✨ Windsurf Command ⭐ >>>>>>>>>>>>>>>> */
/**
 * A split-screen hero component with a bold design.
 *
 * The component accepts the following props:
 *
 * - `title`: The main title of the hero.
 * - `subtitle`: The subtitle of the hero.
 * - `description`: The description of the hero.
 * - `primaryCta`: The primary call-to-action button. The object should have `href` and `text` properties.
 * - `secondaryCta`: The secondary call-to-action button. The object should have `href` and `text` properties.
 * - `image`: The image URL for the right side of the hero.
 * - `stats`: An array of statistics to display on the hero. Each object should have `value` and `label` properties.
 * - `theme`: An object containing theme settings. The object should have `background` and `text` properties.
 * - `animate`: A boolean indicating whether to animate the component. Defaults to `false`.
 *
 * The component renders a split-screen hero with a bold design. The left side contains the title, subtitle, and description, while the right side contains an image. The component also accepts a list of statistics to display on the hero.
 */
/* <<<<<<<<<<  8fffe31c-6bf6-4cc5-a2fa-7fe409c1b784  >>>>>>>>>>> */
const HeroSplitBold: React.FC<HeroProps> = ({
                                                title,
                                                subtitle,
                                                description,
                                                primaryCta,
                                                secondaryCta,
                                                image,
                                                stats,
                                                theme,
                                                animate = false
                                            }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
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

    const Container = animate ? motion.div : 'div';
    const LeftItem = animate ? motion.div : 'div';
    const RightItem = animate ? motion.div : 'div';

    return (
        <Container
            className="min-h-screen flex items-center px-4 bg-white"
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <LeftItem
                    className="space-y-8"
                    variants={animate ? leftVariants : undefined}
                >
                    {subtitle && (
                        <div className="text-sm font-bold text-orange-600 tracking-wide uppercase">
                            {subtitle}
                        </div>
                    )}

                    <h1 className="text-5xl md:text-7xl font-black leading-tight text-gray-900">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {description}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                        {primaryCta && (
                            <a
                                href={primaryCta.href}
                                className="px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-bold text-lg transform hover:scale-105"
                            >
                                {primaryCta.text}
                            </a>
                        )}
                        {secondaryCta && (
                            <a
                                href={secondaryCta.href}
                                className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all font-bold text-lg"
                            >
                                {secondaryCta.text}
                            </a>
                        )}
                    </div>

                    {stats && (
                        <div className="flex gap-8 pt-8">
                            {stats.map((stat, index) => (
                                <div key={index}>
                                    <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </LeftItem>

                <RightItem
                    variants={animate ? rightVariants : undefined}
                >
                    {image && (
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl transform rotate-3"></div>
                            <img
                                src={image}
                                alt="Hero"
                                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                            />
                        </div>
                    )}
                </RightItem>
            </div>
        </Container>
    );
};


export default HeroSplitBold;
