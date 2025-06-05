import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PricingProps } from '../../types/pricing';

const PricingCardsMinimal: React.FC<PricingProps> = ({
                                                         title,
                                                         subtitle,
                                                         description,
                                                         plans,
                                                         billing,
                                                         theme,
                                                         animate = false,
                                                         className,
                                                         'data-testid': testId
                                                     }) => {
    const [isYearly, setIsYearly] = useState(false);

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

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    const Container = animate ? motion.section : 'section';
    const Card = animate ? motion.div : 'div';

    return (
        <Container
            className={`py-16 px-4 bg-gray-50 ${className || ''}`}
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
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 text-balance">
                            {description}
                        </p>
                    )}

                    {/* Billing Toggle */}
                    {billing && (
                        <div className="flex items-center justify-center space-x-4">
      <span className={`text-sm ${!isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
    {billing.monthly}
    </span>
                            <button
                                onClick={() => setIsYearly(!isYearly)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    isYearly ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                                style={{ backgroundColor: isYearly ? theme?.primary || '#3B82F6' : undefined }}
                            >
    <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isYearly ? 'translate-x-6' : 'translate-x-1'
        }`}
    />
                            </button>
                            <span className={`text-sm ${isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
    {billing.yearly}
                                {billing.discount && (
                                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
            {billing.discount}
            </span>
                                )}
    </span>
                        </div>
                    )}
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative bg-white rounded-2xl shadow-sm border ${
                                plan.popular ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200'
                            } p-8 transition-all hover:shadow-md`}
                            variants={animate ? cardVariants : undefined}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span
                className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold"
                style={{ backgroundColor: theme?.primary || undefined }}
            >
  Most Popular
  </span>
                                </div>
                            )}

                            {plan.badge && (
                                <div className="mb-4">
      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
          {plan.badge}
          </span>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline mb-2">
  <span className="text-4xl font-bold text-gray-900">
      {typeof plan.price === 'string' ? plan.price : `$${plan.price}`}
      </span>
                                    <span className="text-gray-500 ml-1">/{plan.period}</span>
                                    {plan.originalPrice && (
                                        <span className="text-lg text-gray-400 line-through ml-2">
          {typeof plan.originalPrice === 'string' ? plan.originalPrice : `$${plan.originalPrice}`}
          </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-balance">{plan.description}</p>

                                {plan.discount && (
                                    <div className="mt-2 text-green-600 font-medium text-sm">
                                        Save {plan.discount.percentage}% - {plan.discount.text}
                                    </div>
                                )}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start">
                                        <svg
                                            className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${
                                                feature.included ? 'text-green-500' : 'text-gray-300'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            {feature.included ? (
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            ) : (
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            )}
                                        </svg>
                                        <span className={`${feature.included ? 'text-gray-700' : 'text-gray-400'} ${
                                            feature.highlighted ? 'font-semibold' : ''
                                        }`}>
  {feature.text}
  </span>
                                        {feature.tooltip && (
                                            <div className="group relative ml-2">
                                                <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                                </svg>
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {feature.tooltip}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {plan.limits && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">Limits</h4>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                        {plan.limits.map((limit, limitIndex) => (
                                            <li key={limitIndex} className="flex justify-between">
                                                <span>{limit.label}</span>
                                                <span className="font-medium">
        {limit.unlimited ? 'Unlimited' : limit.value}
        </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button
                                onClick={plan.cta.onClick}
                                className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-all ${
                                    plan.popular
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                }`}
                                style={plan.popular ? { backgroundColor: theme?.primary || undefined } : undefined}
                            >
                                {plan.cta.text}
                            </button>
                        </Card>
                    ))}
                </div>

                {/* Guarantees */}
                {(plans[0]?.price !== 'Free' && plans[0]?.price !== '$0') && (
                    <div className="mt-12 text-center">
                        <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                30-day money-back guarantee
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                Secure payment
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                24/7 support
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default PricingCardsMinimal;
