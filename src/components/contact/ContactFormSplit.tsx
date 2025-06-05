import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactProps } from '../../types/contact';

const ContactFormSplit: React.FC<ContactProps> = ({
                                                      title,
                                                      subtitle,
                                                      description,
                                                      contactInfo,
                                                      fields = [
                                                          { name: 'name', type: 'text', label: 'Name', placeholder: 'Your name', required: true },
                                                          { name: 'email', type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
                                                          { name: 'message', type: 'textarea', label: 'Message', placeholder: 'Your message', required: true }
                                                      ],
                                                      map,
                                                      theme,
                                                      animate = false,
                                                      successMessage,
                                                      className,
                                                      'data-testid': testId
                                                  }) => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setIsSubmitting(false);
    };

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

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
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
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <Item variants={animate ? itemVariants : undefined}>
                        <div className="space-y-8">
                            {subtitle && (
                                <div
                                    className="text-sm font-semibold text-blue-600 tracking-wide uppercase"
                                    style={{ color: theme?.primary || undefined }}
                                >
                                    {subtitle}
                                </div>
                            )}

                            {title && (
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">
                                    {title}
                                </h2>
                            )}

                            {description && (
                                <p className="text-lg text-gray-600 text-balance">
                                    {description}
                                </p>
                            )}

                            {contactInfo && (
                                <div className="space-y-6">
                                    {contactInfo.phone && (
                                        <div className="flex items-center">
                                            <div
                                                className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"
                                                style={{ backgroundColor: theme?.primary ? `${theme.primary}20` : undefined }}
                                            >
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Phone</div>
                                                <div className="text-gray-600">
                                                    <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                                                        {contactInfo.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {contactInfo.email && (
                                        <div className="flex items-center">
                                            <div
                                                className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"
                                                style={{ backgroundColor: theme?.primary ? `${theme.primary}20` : undefined }}
                                            >
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Email</div>
                                                <div className="text-gray-600">
                                                    <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                                                        {contactInfo.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {contactInfo.address && (
                                        <div className="flex items-center">
                                            <div
                                                className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"
                                                style={{ backgroundColor: theme?.primary ? `${theme.primary}20` : undefined }}
                                            >
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Address</div>
                                                <div className="text-gray-600">{contactInfo.address}</div>
                                            </div>
                                        </div>
                                    )}

                                    {contactInfo.hours && (
                                        <div className="flex items-center">
                                            <div
                                                className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"
                                                style={{ backgroundColor: theme?.primary ? `${theme.primary}20` : undefined }}
                                            >
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Hours</div>
                                                <div className="text-gray-600">{contactInfo.hours}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Map */}
                            {map && (
                                <div className="rounded-lg overflow-hidden shadow-lg">
                                    <iframe
                                        src={map.embedUrl}
                                        width="100%"
                                        height="300"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Location Map"
                                    />
                                </div>
                            )}
                        </div>
                    </Item>

                    {/* Contact Form */}
                    <Item variants={animate ? itemVariants : undefined}>
                        <div className="card p-8">
                            {isSubmitted ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600">
                                        {successMessage || "Thank you for your message. We'll get back to you soon!"}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {fields.map((field, index) => (
                                        <div key={index}>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {field.label}
                                                {field.required && <span className="text-red-500 ml-1">*</span>}
                                            </label>

                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    required={field.required}
                                                    rows={4}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50"
                                                    value={formData[field.name] || ''}
                                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            ) : field.type === 'select' ? (
                                                <select
                                                    name={field.name}
                                                    required={field.required}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50"
                                                    value={formData[field.name] || ''}
                                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                    disabled={isSubmitting}
                                                >
                                                    <option value="">{field.placeholder}</option>
                                                    {field.options?.map((option, optionIndex) => (
                                                        <option key={optionIndex} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    required={field.required}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50"
                                                    value={formData[field.name] || ''}
                                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            )}

                                            {field.helpText && (
                                                <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        style={{ backgroundColor: theme?.primary || undefined }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </Item>
                </div>
            </div>
        </Container>
    );
};

export default ContactFormSplit;
