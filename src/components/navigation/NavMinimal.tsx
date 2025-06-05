import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationProps } from '../../types/navigation';
import { ComponentMetadata } from '../../types/component';

const NavMinimal: React.FC<NavigationProps> = ({
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

    const mobileMenuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: { duration: 0.3 }
        }
    };

    const Nav = animate ? motion.nav : 'nav';

    return (
        <Nav
            className={`w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 ${
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
                                className="text-xl font-bold text-gray-900"
                                style={{ color: theme?.primary || undefined }}
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
                                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center">
                        {cta && (
                            <a
                                href={cta.href}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                    cta.variant === 'secondary'
                                        ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                }`}
                                style={
                                    cta.variant !== 'secondary'
                                        ? { backgroundColor: theme?.primary || undefined }
                                        : { borderColor: theme?.secondary || undefined }
                                }
                            >
                                {cta.text}
                            </a>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 p-2"
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
                            className="md:hidden border-t border-gray-100"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <div className="py-4 space-y-4">
                                {menuItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="block text-gray-600 hover:text-gray-900 font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                {cta && (
                                    <a
                                        href={cta.href}
                                        className="block w-full text-center px-6 py-2 bg-gray-900 text-white rounded-lg font-medium"
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

export const navMinimalMetadata: ComponentMetadata = {
    id: "nav01",
    category: "Navigation",
    layoutType: "Horizontal",
    tone: "Minimal",
    styleTags: ["minimal", "clean", "backdrop-blur"],
    contentVariants: ["withCTA", "withoutCTA", "withLogo", "sticky"],
    useCases: ["SaaS", "Portfolio", "Blog"],
    industryTags: ["Technology", "Creative", "Business"],
    hasForm: false,
    hasImage: true,
    hasAnimation: true,
    responsive: true
};

export default NavMinimal;
