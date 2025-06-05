import { BaseComponentProps, ButtonProps, ImageProps } from './component';

export interface CTAProps extends BaseComponentProps {
    title: string;
    description?: string;
    primaryButton: ButtonProps;
    secondaryButton?: ButtonProps;
    backgroundImage?: ImageProps;
    pattern?: boolean;
    overlay?: {
        color: string;
        opacity: number;
    };
    socialProof : any;
    variant?: 'default' | 'centered' | 'split' | 'banner' | 'popup';
    urgency?: {
        text: string;
        countdown?: {
            endDate: string;
            labels: {
                days: string;
                hours: string;
                minutes: string;
                seconds: string;
            };
        };
    };
    benefits?: Array<{
        text: string;
        icon?: string;
    }>;
    social?: {
        proof: string;
        avatars?: string[];
    };
    dismissible?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Banner CTA interface
export interface BannerCTAProps extends BaseComponentProps {
    message: string;
    cta: ButtonProps;
    dismissible?: boolean;
    position?: 'top' | 'bottom';
    variant?: 'info' | 'success' | 'warning' | 'error';
    icon?: string;
}