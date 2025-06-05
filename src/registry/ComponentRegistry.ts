import { ComponentMetadata } from '../types/component';

export interface RegisteredComponent {
    component: React.ComponentType<any>;
    metadata: ComponentMetadata;
}

export class ComponentRegistry {
    private static components: Map<string, RegisteredComponent> = new Map();

    static registerComponent(id: string, component: React.ComponentType<any>, metadata: ComponentMetadata) {
        this.components.set(id, { component, metadata });
        console.log(`📝 Registry: Registered component ${id} (${metadata.category})`);
    }

    static getComponent(id: string): RegisteredComponent | undefined {
        return this.components.get(id);
    }

    static getAllComponents(): Map<string, RegisteredComponent> {
        return this.components;
    }

    static getComponentsByCategory(category: string): RegisteredComponent[] {
        return Array.from(this.components.values()).filter(
            comp => comp.metadata.category === category
        );
    }

    static getComponentsByTags(tags: string[]): RegisteredComponent[] {
        return Array.from(this.components.values()).filter(comp =>
            tags.some(tag => comp.metadata.styleTags.includes(tag))
        );
    }

    static getComponentsByIndustry(industryTags: string[]): RegisteredComponent[] {
        return Array.from(this.components.values()).filter(comp =>
            industryTags.some(tag => comp.metadata.industryTags.includes(tag))
        );
    }

    static searchComponents(query: {
        category?: string;
        layoutType?: string;
        tone?: string;
        styleTags?: string[];
        industryTags?: string[];
        hasForm?: boolean;
        hasImage?: boolean;
        hasAnimation?: boolean;
        responsive?: boolean;
    }): RegisteredComponent[] {
        return Array.from(this.components.values()).filter(comp => {
            const meta = comp.metadata;

            if (query.category && meta.category !== query.category) return false;
            if (query.layoutType && meta.layoutType !== query.layoutType) return false;
            if (query.tone && meta.tone !== query.tone) return false;
            if (query.hasForm !== undefined && meta.hasForm !== query.hasForm) return false;
            if (query.hasImage !== undefined && meta.hasImage !== query.hasImage) return false;
            if (query.hasAnimation !== undefined && meta.hasAnimation !== query.hasAnimation) return false;
            if (query.responsive !== undefined && meta.responsive !== query.responsive) return false;
            if (query.styleTags && !query.styleTags.some(tag => meta.styleTags.includes(tag))) return false;
            if (query.industryTags && !query.industryTags.some(tag => meta.industryTags.includes(tag))) return false;

            return true;
        });
    }

    static getComponentMetadata(): ComponentMetadata[] {
        return Array.from(this.components.values()).map(comp => comp.metadata);
    }

    static getStats() {
        const components = Array.from(this.components.values());
        const categories = new Set(components.map(c => c.metadata.category));
        const tones = new Set(components.map(c => c.metadata.tone));
        const industries = new Set(components.flatMap(c => c.metadata.industryTags));

        return {
            totalComponents: components.length,
            categories: Array.from(categories),
            tones: Array.from(tones),
            industries: Array.from(industries),
            animatedComponents: components.filter(c => c.metadata.hasAnimation).length,
            responsiveComponents: components.filter(c => c.metadata.responsive).length,
            formComponents: components.filter(c => c.metadata.hasForm).length
        };
    }
}

export default ComponentRegistry;