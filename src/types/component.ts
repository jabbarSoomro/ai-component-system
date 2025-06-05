import { ReactNode } from 'react';

export interface ComponentMetadata {
    id: string;
    category: string;
    layoutType: string;
    tone: string;
    styleTags: string[];
    contentVariants: string[];
    useCases: string[];
    industryTags: string[];
    hasForm: boolean;
    hasImage: boolean;
    hasAnimation: boolean;
    responsive: boolean;
}

export interface ThemeConfig {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
    surface?: string;
    border?: string;
    success?: string;
    warning?: string;
    error?: string;
}

// React 19 optimized base props
export interface BaseComponentProps {
    className?: string;
    children?: ReactNode;
    theme?: ThemeConfig;
    animate?: boolean;
    'data-testid'?: string;
}

// Enhanced for React 19 form handling
export interface FormProps extends BaseComponentProps {
    onSubmit?: (data: FormData) => void | Promise<void>;
    action?: string | ((formData: FormData) => void | Promise<void>);
    method?: 'GET' | 'POST';
    pending?: boolean;
}

// Hero component props
export interface HeroProps extends BaseComponentProps {
    title: string;
    subtitle?: string;
    description?: string;
    primaryCta?: {
        text: string;
        href: string;
        onClick?: () => void;
    };
    secondaryCta?: {
        text: string;
        href: string;
        onClick?: () => void;
    };
    image?: string;
    video?: string;
    badge?: string;
    stats?: Array<{
        value: string;
        label: string;
    }>;
}

// Animation variants for consistent animations across components
export interface AnimationVariant {
    hidden: {
        opacity: number;
        x?: number;
        y?: number;
        scale?: number;
    };
    visible: {
        opacity: number;
        x?: number;
        y?: number;
        scale?: number;
        transition?: {
            duration?: number;
            delay?: number;
            ease?: number[] | string;
            staggerChildren?: number;
        };
    };
}

// Common button interface
export interface ButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    icon?: ReactNode;
}

// Image interface with optimization
export interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    loading?: 'lazy' | 'eager';
    priority?: boolean;
}