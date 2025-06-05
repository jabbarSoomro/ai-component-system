import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FooterProps } from '../../types/footer';

const FooterDark: React.FC<FooterProps> = ({
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
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const Container = animate ? motion.footer : 'footer';
    const Item = animate ? motion.div : 'div';

    return (
        <Container
            className="bg-gray-900 text-white relative overflow-hidden"
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <Item
                        className="lg:col-span-2"
                        variants={animate ? itemVariants : undefined}
                    >
                        <div className="mb-6">
                            {logo?.image ? (
                                <img src={logo.image} alt="Logo" className="h-10 w-auto" />
                            ) : (
                                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    {logo?.text || 'Brand'}
                                </div>
                            )}
                        </div>
                        {description && (
                            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
                                {description}
                            </p>
                        )}
                        {socialLinks && (
                            <div className="flex space-x-6">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                                        aria-label={social.name}
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
                            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-colors relative group"
                                        >
                                            {link.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all group-hover:w-full" />
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
                            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">
                                {newsletter.title}
                            </h3>
                            <p className="text-gray-300 mb-6">
                                {newsletter.description}
                            </p>
                            <form className="space-y-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={newsletter.placeholder}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium transform hover:scale-105"
                                >
                                    {newsletter.buttonText}
                                </button>
                            </form>
                        </Item>
                    )}
                </div>

                {/* Copyright */}
                <Item
                    className="mt-16 pt-8 border-t border-gray-800"
                    variants={animate ? itemVariants : undefined}
                >
                    <p className="text-center text-gray-400">
                        {copyright || `© ${new Date().getFullYear()} All rights reserved.`}
                    </p>
                </Item>
            </div>
        </Container>
    );
};


export default FooterDark;
