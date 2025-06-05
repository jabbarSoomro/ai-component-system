import { BaseComponentProps, FormProps } from './component';

export interface ContactProps extends FormProps {
    title?: string;
    subtitle?: string;
    description?: string;
    contactInfo?: {
        phone?: string;
        email?: string;
        address?: string;
        hours?: string;
        timezone?: string;
    };
    fields?: Array<{
        name: string;
        type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
        label: string;
        placeholder?: string;
        required?: boolean;
        options?: Array<{
            value: string;
            label: string;
        }>;
        validation?: {
            pattern?: string;
            minLength?: number;
            maxLength?: number;
            min?: number;
            max?: number;
        };
        helpText?: string;
    }>;
    map?: {
        embedUrl: string;
        markers?: Array<{
            lat: number;
            lng: number;
            title: string;
            description?: string;
        }>;
    };
    variant?: 'split' | 'centered' | 'inline' | 'modal';
    showSocialLinks?: boolean;
    socialLinks?: Array<{
        name: string;
        href: string;
        icon: string;
    }>;
    departments?: Array<{
        name: string;
        email: string;
        phone?: string;
        description?: string;
    }>;
    responseTime?: string;
    successMessage?: string;
    errorMessage?: string;
}

// FAQ for contact page
export interface ContactFAQProps extends BaseComponentProps {
    title?: string;
    subtitle?: string;
    faqs: Array<{
        question: string;
        answer: string;
        category?: string;
    }>;
    contactCTA?: {
        text: string;
        description: string;
        href: string;
    };
}