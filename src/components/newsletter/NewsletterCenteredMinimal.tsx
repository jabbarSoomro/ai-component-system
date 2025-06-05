
// components/newsletter/NewsletterCenteredMinimal.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NewsletterProps } from '../../types/newsletter';

const NewsletterCenteredMinimal: React.FC<NewsletterProps> = ({
                                                                  title,
                                                                  description,
                                                                  placeholder = "Enter your email address",
                                                                  buttonText = "Subscribe",
                                                                  incentive,
                                                                  privacy,
                                                                  benefits,
                                                                  socialProof,
                                                                  theme,
                                                                  animate = false,
                                                                  successMessage,
                                                                  className,
                                                                  'data-testid': testId
                                                              }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Newsletter signup:', email);
        setIsSubmitted(true);
        setIsSubmitting(false);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const Container = animate ? motion.section : 'section';

    if (isSubmitted) {
        return (
            <Container
                className={`py-16 px-4 bg-green-50 ${className || ''}`}
                variants={animate ? containerVariants : undefined}
                initial={animate ? "hidden" : undefined}
                animate={animate ? "visible" : undefined}
                data-testid={testId}
            >
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank you for subscribing!</h3>
                    <p className="text-gray-600">
                        {successMessage || "We'll send you updates and valuable content straight to your inbox."}
                    </p>
                </div>
            </Container>
        );
    }

    return (
        <Container
            className={`py-16 px-4 bg-white ${className || ''}`}
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
            data-testid={testId}
        >
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-balance">
                    {title}
                </h2>

                {description && (
                    <p className="text-lg text-gray-600 mb-8 text-balance">
                        {description}
                    </p>
                )}

                {/* Social Proof */}
                {socialProof && (
                    <div className="mb-8">
                        <div className="flex justify-center items-center space-x-2 mb-2">
                            {socialProof.avatars && (
                                <div className="flex -space-x-2">
                                    {socialProof.avatars.map((avatar, index) => (
                                        <img
                                            key={index}
                                            src={avatar}
                                            alt={`Subscriber ${index + 1}`}
                                            className="w-8 h-8 rounded-full border-2 border-white"
                                            loading="lazy"
                                        />
                                    ))}
                                </div>
                            )}
                            <span className="text-sm text-gray-600">
                {socialProof.subscriberCount} subscribers
              </span>
                        </div>
                        {socialProof.testimonial && (
                            <p className="text-sm text-gray-600 italic">
                                "{socialProof.testimonial}"
                            </p>
                        )}
                    </div>
                )}

                {incentive && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                        <p className="text-blue-800 font-medium">✨ {incentive}</p>
                    </div>
                )}

                {/* Benefits */}
                {benefits && (
                    <div className="mb-8">
                        <ul className="space-y-2">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center justify-center text-gray-700">
                                    {benefit.icon ? (
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={benefit.icon} />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {benefit.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={placeholder}
                        required
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        style={{ backgroundColor: theme?.primary || undefined }}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Subscribing...
                            </>
                        ) : (
                            buttonText
                        )}
                    </button>
                </form>

                {privacy && (
                    <p className="text-sm text-gray-500">
                        {privacy}
                    </p>
                )}
            </div>
        </Container>
    );
};

export default NewsletterCenteredMinimal;
