import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationProps } from '../../types/navigation';

import { ComponentMetadata } from '../../types/component';

const NavDropdown: React.FC<NavigationProps> = ({
                                                    logo,
                                                    menuItems,
                                                    cta,
                                                    theme,
                                                    animate = false,
                                                    sticky = true
                                                }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.2 }
        }
    };

    return (
        <nav className={`w-full bg-white shadow-sm z-50 ${sticky ? 'sticky top-0' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        {logo?.image ? (
                            <img src={logo.image} alt="Logo" className="h-10 w-auto" />
                        ) : (
                            <a
                                href={logo?.href || '/'}
                                className="text-2xl font-bold text-gray-900"
                            >
                                {logo?.text || 'Logo'}
                            </a>
                        )}
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <a
                                    href={item.href}
                                    className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium rounded-lg hover:bg-gray-50"
                                >
                                    {item.label}
                                    {item.hasDropdown && (
                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </a>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {item.hasDropdown && activeDropdown === index && item.dropdownItems && (
                                        <motion.div
                                            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                        >
                                            {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                                                <a
                                                    key={dropdownIndex}
                                                    href={dropdownItem.href}
                                                    className="block px-6 py-3 hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="font-medium text-gray-900">{dropdownItem.label}</div>
                                                    {dropdownItem.description && (
                                                        <div className="text-sm text-gray-500 mt-1">{dropdownItem.description}</div>
                                                    )}
                                                </a>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {cta && (
                            <>
                                {cta.variant === 'secondary' && (
                                    <a
                                        href="#"
                                        className="text-gray-700 hover:text-gray-900 font-medium"
                                    >
                                        Sign In
                                    </a>
                                )}
                                <a
                                    href={cta.href}
                                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                                >
                                    {cta.text}
                                </a>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-gray-900 p-2"
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
                    {isOpen  ? (
                        <motion.div
                            className="lg:hidden border-t border-gray-100"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="py-4 space-y-2">
                                {menuItems.map((item, index) => (
                                    <div key={index}>
                                        <a
                                            href={item.href}
                                            className="block px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                        {item.dropdownItems && (
                                            <div className="pl-4 space-y-1">
                                                {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                                                    <a
                                                        key={dropdownIndex}
                                                        href={dropdownItem.href}
                                                        className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {dropdownItem.label}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {cta && (
                                    <div className="pt-4 border-t border-gray-100">
                                        <a
                                            href={cta.href}
                                            className="block w-full text-center px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {cta.text}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export const navDropdownMetadata: ComponentMetadata = {
    id: "nav03",
    category: "Navigation",
    layoutType: "Horizontal",
    tone: "Professional",
    styleTags: ["professional", "dropdown", "mega-menu"],
    contentVariants: ["withDropdown", "withCTA", "withAuth", "sticky"],
    useCases: ["Enterprise", "E-commerce", "Corporate"],
    industryTags: ["Enterprise", "E-commerce", "Corporate"],
    hasForm: false,
    hasImage: true,
    hasAnimation: true,
    responsive: true
};

export default NavDropdown;