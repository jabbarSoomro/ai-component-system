import { BaseComponentProps, FormProps } from './component';

export interface NewsletterProps extends FormProps {
    title: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
    incentive?: string;
    privacy?: string;
    layout?: 'centered' | 'inline' | 'card' | 'popup' | 'sidebar';
    variant?: 'minimal' | 'detailed' | 'visual';
    benefits?: Array<{
        text: string;
        icon?: string;
    }>;
    socialProof?: {
        subscriberCount: string;
        avatars?: string[];
        testimonial?: string;
    };
    frequency?: string;
    categories?: Array<{
        name: string;
        description: string;
        selected?: boolean;
    }>;
    doubleOptIn?: boolean;
    gdprCompliant?: boolean;
    preview?: {
        enabled: boolean;
        url?: string;
    };
    exitIntent?: boolean;
    delay?: number;
    successMessage?: string;
    errorMessage?: string;
}

// Email preferences interface
export interface EmailPreferencesProps extends BaseComponentProps {
    title?: string;
    subtitle?: string;
    categories: Array<{
        id: string;
        name: string;
        description: string;
        frequency: string;
        enabled: boolean;
    }>;
    globalSettings: {
        unsubscribeAll: boolean;
        frequency: 'daily' | 'weekly' | 'monthly';
        format: 'html' | 'text';
    };
    onSave: (preferences: any) => void;
}
