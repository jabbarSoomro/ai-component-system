import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialProps } from '../../types/testimonial';

const TestimonialGridMinimal: React.FC<TestimonialProps> = ({
                                                                title,
                                                                subtitle,
                                                                testimonials,
                                                                theme,
                                                                animate = false,
                                                                showRatings = true,
                                                                showCompany = true,
                                                                className,
                                                                'data-testid': testId
                                                            }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const Container = animate ? motion.section : 'section';
    const Card = animate ? motion.div : 'div';

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <Container
            className={`py-16 px-4 bg-white ${className || ''}`}
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
            data-testid={testId}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    {subtitle && (
                        <div
                            className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4"
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
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial : any, index:any) => (
                        <Card
                            key={index}
                            className={`bg-gray-50 rounded-2xl p-8 relative transition-all hover:shadow-md ${
                                testimonial.featured ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                            }`}
                            variants={animate ? cardVariants : undefined}
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-6 text-gray-200">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>

                            {/* Rating */}
                            {showRatings && testimonial.rating && (
                                <div className="flex mb-4">
                                    {renderStars(testimonial.rating)}
                                </div>
                            )}

                            {/* Featured Badge */}
                            {testimonial.featured && (
                                <div className="mb-4">
      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          Featured Review
  </span>
                                </div>
                            )}

                            {/* Content */}
                            <p className="text-gray-700 leading-relaxed mb-6 text-balance">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center">
                                {testimonial.author.avatar ? (
                                    <img
                                        src={testimonial.author.avatar}
                                        alt={testimonial.author.name}
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
      <span className="text-gray-600 font-semibold">
          {testimonial.author.name.charAt(0)}
          </span>
                                    </div>
                                )}
                                <div>
                                    <div className="font-semibold text-gray-900 flex items-center">
                                        {testimonial.author.name}
                                        {testimonial.author.linkedin && (
                                            <a
                                                href={testimonial.author.linkedin}
                                                className="ml-2 text-blue-600 hover:text-blue-700"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {testimonial.author.title}
                                        {showCompany && testimonial.author.company && `, ${testimonial.author.company}`}
                                    </div>
                                    {testimonial.date && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            {new Date(testimonial.date).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Metrics */}
                            {testimonial.metrics && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex justify-between">
                                        {testimonial.metrics.map((metric : any, metricIndex : any) => (
                                            <div key={metricIndex} className="text-center">
                                                <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                                                <div className="text-xs text-gray-600">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default TestimonialGridMinimal;
