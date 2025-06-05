import { BaseComponentProps } from './component';

export interface FAQProps extends BaseComponentProps {
    title?: string;
    subtitle?: string;
    description?: string;
    faqs: Array<{
        id?: string;
        question: string;
        answer: string;
        category?: string;
        tags?: string[];
        helpful?: {
            count: number;
            userVoted?: boolean;
        };
        relatedQuestions?: string[];
    }>;
    layout?: 'accordion' | 'grid' | 'tabs' | 'search';
    categories?: Array<{
        name: string;
        slug: string;
        count: number;
        icon?: string;
    }>;
    searchable?: boolean;
    showCategories?: boolean;
    showHelpful?: boolean;
    showRelated?: boolean;
    contactCTA?: {
        title: string;
        description: string;
        buttonText: string;
        href: string;
    };
    variant?: 'default' | 'compact' | 'detailed' | 'sidebar';
    defaultOpen?: boolean;
    multipleOpen?: boolean;
    analytics?: {
        trackViews: boolean;
        trackHelpful: boolean;
        trackSearch: boolean;
    };
}

// FAQ Search interface
export interface FAQSearchProps extends BaseComponentProps {
    placeholder?: string;
    suggestions?: string[];
    onSearch: (query: string) => void;
    onSelect: (faq: any) => void;
    results?: Array<{
        question: string;
        answer: string;
        relevance: number;
    }>;
    loading?: boolean;
    noResultsMessage?: string;
}

// FAQ Category interface
export interface FAQCategoryProps extends BaseComponentProps {
    category: {
        name: string;
        description?: string;
        icon?: string;
        color?: string;
    };
    faqs: Array<{
        question: string;
        answer: string;
        popular?: boolean;
    }>;
    showPopular?: boolean;
    limit?: number;
}