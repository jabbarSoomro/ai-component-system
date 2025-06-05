import React from 'react';
import { motion } from 'framer-motion';
import { CTAProps } from '../../types/cta';

const CTACenteredMinimal: React.FC<CTAProps> = ({
                                                    title,
                                                    description,
                                                    primaryButton,
                                                    secondaryButton,
                                                    backgroundImage,
                                                    benefits,
                                                    socialProof,
                                                    theme,
                                                    animate = false,
                                                    className,
                                                    'data-testid': testId
                                                }) => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const Container = animate ? motion.section : 'section';

    return (
        <Container
            className={`py-16 px-4 bg-gray-50 relative overflow-hidden ${className || ''}`}
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
            data-testid={testId}
            style={{
                backgroundImage: backgroundImage?.src ? `url(${backgroundImage.src})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Background Overlay */}
            {backgroundImage && (
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            )}

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-balance ${
                    backgroundImage ? 'text-white' : 'text-gray-900'
                }`}>
                    {title}
                </h2>

                {description && (
                    <p className={`text-lg mb-8 max-w-2xl mx-auto text-balance ${
                        backgroundImage ? 'text-gray-200' : 'text-gray-600'
                    }`}>
                        {description}
                    </p>
                )}

                {/* Benefits */}
                {benefits && (
                    <div className="flex flex-wrap justify-center gap-6 mb-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center">
                                {benefit.icon && (
                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={benefit.icon} />
                                    </svg>
                                )}
                                <span className={backgroundImage ? 'text-white' : 'text-gray-700'}>
        {benefit.text}
        </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Social Proof */}
                {socialProof && (
                    <div className="mb-8">
                        <div className="flex justify-center items-center space-x-2 mb-2">
                            {socialProof.avatars && (
                                <div className="flex -space-x-2">
                                    {socialProof.avatars.map((avatar :any, index : any) => (
                                        <img
                                            key={index}
                                            src={avatar}
                                            alt={`Customer ${index + 1}`}
                                            className="w-8 h-8 rounded-full border-2 border-white"
                                            loading="lazy"
                                        />
                                    ))}
                                </div>
                            )}
                            <span className={`text-sm ${backgroundImage ? 'text-gray-200' : 'text-gray-600'}`}>
    {socialProof.proof}
    </span>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={primaryButton.onClick}
                        className="btn-primary text-lg px-8 py-4"
                        style={{ backgroundColor: theme?.primary || undefined }}
                    >
                        {primaryButton.text}
                    </button>

                    {secondaryButton && (
                        <button
                            onClick={secondaryButton.onClick}
                            className={`btn-secondary text-lg px-8 py-4 ${
                                backgroundImage ? 'bg-white/20 border-white text-white hover:bg-white/30' : ''
                            }`}
                        >
                            {secondaryButton.text}
                        </button>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default CTACenteredMinimal;