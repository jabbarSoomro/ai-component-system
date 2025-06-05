import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQProps } from '../../types/faq';

const FAQAccordion: React.FC<FAQProps> = ({
                                              title,
                                              subtitle,
                                              description,
                                              faqs,
                                              theme,
                                              animate = false,
                                              showHelpful = false,
                                              defaultOpen = false,
                                              multipleOpen = false,
                                              className,
                                              'data-testid': testId
                                          }) => {
    const [openIndex, setOpenIndex] = useState<number | Set<number>>(
        multipleOpen ? new Set() : (defaultOpen ? 0 : -1)
    );
    const [helpfulVotes, setHelpfulVotes] = useState<Record<number, { helpful: number; total: number }>>({});

    const toggleFAQ = (index: number) => {
        if (multipleOpen) {
            const newOpenIndex = new Set(openIndex as Set<number>);
            if (newOpenIndex.has(index)) {
                newOpenIndex.delete(index);
            } else {
                newOpenIndex.add(index);
            }
            setOpenIndex(newOpenIndex);
        } else {
            setOpenIndex(openIndex === index ? -1 : index);
        }
    };

    const isOpen = (index: number) => {
        return multipleOpen ? (openIndex as Set<number>).has(index) : openIndex === index;
    };

    const handleHelpfulVote = (index: number, isHelpful: boolean) => {
        setHelpfulVotes(prev => ({
            ...prev,
            [index]: {
                helpful: (prev[index]?.helpful || 0) + (isHelpful ? 1 : 0),
                total: (prev[index]?.total || 0) + 1
            }
        }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
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

    const Container = animate ? motion.section : 'section';
    const Item = animate ? motion.div : 'div';

    return (
        <Container
            className={`py-16 px-4 bg-white ${className || ''}`}
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
            data-testid={testId}
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    {subtitle && (
                        <div
                            className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4"
                            style={{ color: theme?.primary || undefined }}
                        >
                            {subtitle}
                        </div>
                    )}
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
                            {description}
                        </p>
                    )}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Item
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                            variants={animate ? itemVariants : undefined}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                aria-expanded={isOpen(index)}
                            >
    <span className="font-semibold text-gray-900 pr-4 text-balance">
        {faq.question}
        </span>
                                <svg
                                    className={`w-5 h-5 text-gray-500 transition-transform ${
                                        isOpen(index) ? 'transform rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {isOpen(index) ? (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                                            <p className="text-gray-600 leading-relaxed mb-4 text-balance">
                                                {faq.answer}
                                            </p>

                                            {/* Helpful Vote */}
                                            {showHelpful && (
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <span className="text-gray-500">Was this helpful?</span>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleHelpfulVote(index, true)}
                                                            className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                                            </svg>
                                                            <span>Yes</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleHelpfulVote(index, false)}
                                                            className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                                                            </svg>
                                                            <span>No</span>
                                                        </button>
                                                    </div>
                                                    {helpfulVotes[index] && (
                                                        <span className="text-gray-500">
              ({helpfulVotes[index].helpful}/{helpfulVotes[index].total} found this helpful)
      </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                        </Item>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default FAQAccordion;