import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationProps } from '../../types/navigation';
import { ComponentMetadata } from '../../types/component';

const NavDark: React.FC<NavigationProps> = ({
                                                logo,
                                                menuItems,
                                                cta,
                                                theme,
                                                animate = false,
                                                sticky = true
                                            }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    const Nav = animate ? motion.nav : 'nav';

    return (
        <Nav
            className={`w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50 ${
                sticky ? 'sticky top-0' : ''
            }`}
            variants={animate ? navVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        {logo?.image ? (
                            <img src={logo.image} alt="Logo" className="h-8 w-auto" />
                        ) : (
                            <a
                                href={logo?.href || '/'}
                                className="text-xl font-bold text-white"
                            >
                                {logo?.text || 'Logo'}
                            </a>
                        )}
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="text-gray-300 hover:text-white transition-colors font-medium relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center">
                        {cta && (
                            <a
                                href={cta.href}
                                className={`px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
                                    cta.variant === 'secondary'
                                        ? 'border border-gray-600 text-gray-300 hover:bg-gray-800'
                                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg'
                                }`}
                            >
                                {cta.text}
                            </a>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="md:hidden border-t border-gray-800"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="py-4 space-y-4">
                                {menuItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="block text-gray-300 hover:text-white font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                {cta && (
                                    <a
                                        href={cta.href}
                                        className="block w-full text-center px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {cta.text}
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Nav>
    );
};

export const navDarkMetadata: ComponentMetadata = {
    id: "nav02",
    category: "Navigation",
    layoutType: "Horizontal",
    tone: "Dark",
    styleTags: ["dark", "gradient", "glow-effects"],
    contentVariants: ["withCTA", "withoutCTA", "withLogo", "sticky"],
    useCases: ["Gaming", "Tech", "Creative"],
    industryTags: ["Gaming", "Technology", "Creative"],
    hasForm: false,
    hasImage: true,
    hasAnimation: true,
    responsive: true
};

export default NavDark;
