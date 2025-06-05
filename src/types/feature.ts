import { BaseComponentProps, ImageProps } from './component';

export interface FeatureProps extends BaseComponentProps {
    title?: string;
    subtitle?: string;
    description?: string;
    features: Array<{
        title: string;
        description: string;
        icon?: string;
        image?: ImageProps;
        badge?: string;
        link?: {
            text: string;
            href: string;
        };
        stats?: Array<{
            value: string;
            label: string;
        }>;
    }>;
    layout?: 'grid' | 'list' | 'alternating' | 'centered' | 'masonry';
    columns?: 1 | 2 | 3 | 4 | 6;
    variant?: 'default' | 'cards' | 'bordered' | 'highlighted';
    iconStyle?: 'outline' | 'filled' | 'duotone';
    imageAspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
    showNumbers?: boolean;
    centerContent?: boolean;
}

// Comparison feature interface
export interface ComparisonFeatureProps extends BaseComponentProps {
    title?: string;
    subtitle?: string;
    description?: string;
    beforeAfter: {
        before: {
            title: string;
            description: string;
            image?: ImageProps;
            features: string[];
        };
        after: {
            title: string;
            description: string;
            image?: ImageProps;
            features: string[];
        };
    };
    highlightDifferences?: boolean;
}

// Process/Steps interface
export interface ProcessProps extends BaseComponentProps {
    title?: string;
    subtitle?: string;
    description?: string;
    steps: Array<{
        title: string;
        description: string;
        icon?: string;
        image?: ImageProps;
        badge?: string;
        step?: number;
    }>;
    layout?: 'vertical' | 'horizontal' | 'circular';
    showConnectors?: boolean;
    variant?: 'numbered' | 'icons' | 'timeline';
}

