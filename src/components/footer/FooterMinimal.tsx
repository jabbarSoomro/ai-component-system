// components/footer/FooterMinimal.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FooterProps } from '../../types/footer';

const FooterMinimal: React.FC<FooterProps> = ({
                                                  logo,
                                                  description,
                                                  sections,
                                                  newsletter,
                                                  socialLinks,
                                                  copyright,
                                                  theme,
                                                  animate = false
                                              }) => {
    const [email, setEmail] = useState('');

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
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

    const Container = animate ? motion.footer : 'footer';
    const Item = animate ? motion.div : 'div';

    return (
        <Container
            className="bg-white border-t border-gray-100"
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <Item
                        className="lg:col-span-2"
                        variants={animate ? itemVariants : undefined}
                    >
                        <div className="mb-4">
                            {logo?.image ? (
                                <img src={logo.image} alt="Logo" className="h-8 w-auto" />
                            ) : (
                                <div className="text-xl font-bold text-gray-900">
                                    {logo?.text || 'Brand'}
                                </div>
                            )}
                        </div>
                        {description && (
                            <p className="text-gray-600 mb-6 max-w-md">
                                {description}
                            </p>
                        )}
                        {socialLinks && (
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        aria-label={social.name}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={social.icon} />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        )}
                    </Item>

                    {/* Navigation Sections */}
                    {sections.map((section, index) => (
                        <Item
                            key={index}
                            variants={animate ? itemVariants : undefined}
                        >
                            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-gray-900 transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Item>
                    ))}

                    {/* Newsletter */}
                    {newsletter && (
                        <Item
                            className="lg:col-span-1"
                            variants={animate ? itemVariants : undefined}
                        >
                            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                                {newsletter.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {newsletter.description}
                            </p>
                            <form className="flex">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={newsletter.placeholder}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gray-900 text-white rounded-r-lg hover:bg-gray-800 transition-colors"
                                >
                                    {newsletter.buttonText}
                                </button>
                            </form>
                        </Item>
                    )}
                </div>

                {/* Copyright */}
                <Item
                    className="mt-12 pt-8 border-t border-gray-100"
                    variants={animate ? itemVariants : undefined}
                >
                    <p className="text-center text-gray-500">
                        {copyright || `© ${new Date().getFullYear()} All rights reserved.`}
                    </p>
                </Item>
            </div>
        </Container>
    );
};


export default FooterMinimal;
