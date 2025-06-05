import { BaseComponentProps } from './component';

export interface StatsProps extends BaseComponentProps {
    title?: string;
    subtitle?: string;
    description?: string;
    stats: Array<{
        id?: string;
        value: string | number;
        label: string;
        description?: string;
        icon?: string;
        prefix?: string;
        suffix?: string;
        color?: string;
        trend?: {
            value: number;
            direction: 'up' | 'down' | 'neutral';
            period: string;
        };
        chart?: {
            data: number[];
            type: 'line' | 'bar' | 'area';
            color?: string;
        };
    }>;
    layout?: 'grid' | 'inline' | 'centered' | 'cards';
    columns?: 2 | 3 | 4 | 5 | 6;
    variant?: 'default' | 'cards' | 'minimal' | 'detailed' | 'bordered';
    animate?: boolean;
    countUp?: boolean;
    showTrends?: boolean;
    showCharts?: boolean;
    period?: string;
    lastUpdated?: string;
}

// Real-time stats interface
export interface RealTimeStatsProps extends BaseComponentProps {
    title?: string;
    subtitle?: string;
    stats: Array<{
        id: string;
        label: string;
        value: number;
        format: 'number' | 'currency' | 'percentage';
        realTime: boolean;
        updateInterval?: number;
    }>;
    refreshInterval?: number;
    showLastUpdated?: boolean;
    onDataUpdate?: (stats: any[]) => void;
}

// Analytics dashboard interface
export interface AnalyticsDashboardProps extends BaseComponentProps {
    title?: string;
    dateRange: {
        start: string;
        end: string;
        presets?: Array<{
            label: string;
            value: string;
        }>;
    };
    widgets: Array<{
        id: string;
        type: 'stat' | 'chart' | 'table' | 'metric';
        title: string;
        size: 'sm' | 'md' | 'lg' | 'xl';
        data: any;
        config?: any;
    }>;
    layout?: 'grid' | 'masonry';
    customizable?: boolean;
    exportable?: boolean;
}
