import { BaseComponentProps } from './component';

export interface TestimonialProps extends BaseComponentProps {
    title?: string;
    subtitle?: string;
    description?: string;
    testimonials: Array<{
        content: string;
        author: {
            name: string;
            title: string;
            company?: string;
            avatar?: string;
            linkedin?: string;
            twitter?: string;
        };
        rating?: number;
        date?: string;
        featured?: boolean;
        video?: {
            thumbnail: string;
            url: string;
        };
        metrics?: Array<{
            value: string;
            label: string;
        }>;
    }>;
    layout?: 'grid' | 'carousel' | 'single' | 'masonry' | 'wall';
    columns?: 1 | 2 | 3 | 4;
    variant?: 'cards' | 'quotes' | 'minimal' | 'detailed';
    showRatings?: boolean;
    showCompany?: boolean;
    showDate?: boolean;
    autoplay?: boolean;
    filterByRating?: number;
    categories?: Array<{
        name: string;
        slug: string;
        count?: number;
    }>;
}

// Review/Rating interface
export interface ReviewProps extends BaseComponentProps {
    title?: string;
    subtitle?: string;
    overallRating: {
        score: number;
        totalReviews: number;
        distribution: Array<{
            stars: number;
            count: number;
            percentage: number;
        }>;
    };
    reviews: Array<{
        id: string;
        author: {
            name: string;
            avatar?: string;
            verified?: boolean;
        };
        rating: number;
        title: string;
        content: string;
        date: string;
        helpful?: {
            count: number;
            userVoted?: boolean;
        };
        images?: string[];
    }>;
    filters?: Array<{
        label: string;
        value: string;
        count: number;
    }>;
    sortOptions?: Array<{
        label: string;
        value: string;
    }>;
}
