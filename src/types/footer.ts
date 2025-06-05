import { ThemeConfig } from './component';
export interface FooterProps {
    logo?: {
        text?: string;
        image?: string;
        href?: string;
    };
    description?: string;
    sections: Array<{
        title: string;
        links: Array<{
            label: string;
            href: string;
        }>;
    }>;
    newsletter?: {
        title: string;
        description: string;
        placeholder: string;
        buttonText: string;
    };
    socialLinks?: Array<{
        name: string;
        href: string;
        icon: string;
    }>;
    copyright?: string;
    theme?: ThemeConfig;
    animate?: boolean;
}
