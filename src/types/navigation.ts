import { BaseComponentProps, ButtonProps } from './component';

export interface NavigationProps extends BaseComponentProps {
    logo?: {
        text?: string;
        image?: string;
        href?: string;
        width?: number;
        height?: number;
    };
    menuItems: Array<{
        label: string;
        href: string;
        hasDropdown?: boolean;
        dropdownItems?: Array<{
            label: string;
            href: string;
            description?: string;
            icon?: string;
            badge?: string;
        }>;
        icon?: string;
        badge?: string;
        isActive?: boolean;
    }>;
    cta?: ButtonProps;
    sticky?: boolean;
    transparent?: boolean;
    bordered?: boolean;
    variant?: 'default' | 'centered' | 'split' | 'sidebar';
    mobileBreakpoint?: 'sm' | 'md' | 'lg';
    searchEnabled?: boolean;
    languageSelector?: {
        enabled: boolean;
        languages: Array<{
            code: string;
            name: string;
            flag?: string;
        }>;
    };
    userMenu?: {
        enabled: boolean;
        avatar?: string;
        name?: string;
        menuItems: Array<{
            label: string;
            href: string;
            icon?: string;
            divider?: boolean;
        }>;
    };
}

// Breadcrumb navigation interface
export interface BreadcrumbProps extends BaseComponentProps {
    items: Array<{
        label: string;
        href?: string;
        icon?: string;
        isActive?: boolean;
    }>;
    separator?: 'slash' | 'chevron' | 'arrow' | 'dot';
    showHome?: boolean;
    maxItems?: number;
}
