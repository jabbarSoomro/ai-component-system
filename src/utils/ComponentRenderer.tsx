import React from 'react';
import { ComponentRegistry } from '../registry/ComponentRegistry';
import { GeneratedLayout } from '../ai/ComponentGenerator';

export interface RendererProps {
    layout: GeneratedLayout;
    className?: string;
    showDebugInfo?: boolean;
}

export const ComponentRenderer: React.FC<RendererProps> = ({
                                                               layout,
                                                               className,
                                                               showDebugInfo = false
                                                           }) => {
    console.log('🎨 ComponentRenderer: Rendering layout with', layout.sections.length, 'sections');

    if (!layout || !layout.sections || layout.sections.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Layout Generated</h3>
                    <p className="text-gray-600">Generate a layout using the AI tool to see components here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative ${className || ''}`}>
            {/* Debug Info */}
            {showDebugInfo && (
                <div className="fixed bottom-4 left-4 z-50 bg-black text-white p-4 rounded-lg max-w-sm">
                    <h4 className="font-semibold mb-2">Debug Info</h4>
                    <div className="text-sm space-y-1">
                        <div>Sections: {layout.sections.length}</div>
                        <div>Theme: {layout.theme.primary}</div>
                        <div>Generated: {new Date(layout.metadata.generatedAt).toLocaleTimeString()}</div>
                    </div>
                </div>
            )}

            {/* Render Components */}
            {layout.sections
                .sort((a, b) => a.order - b.order)
                .map((section, index) => {
                    const registeredComponent = ComponentRegistry.getComponent(section.componentId);

                    if (!registeredComponent) {
                        console.warn(`⚠️ ComponentRenderer: Component ${section.componentId} not found in registry`);
                        return (
                            <div key={`missing-${index}`} className="bg-red-50 border border-red-200 p-8 m-4 rounded-lg">
                                <h3 className="text-red-800 font-semibold mb-2">Component Not Found</h3>
                                <p className="text-red-600">
                                    Component <code className="bg-red-100 px-2 py-1 rounded">{section.componentId}</code>
                                    is not registered in the component registry.
                                </p>
                            </div>
                        );
                    }

                    const Component = registeredComponent.component;

                    try {
                        return (
                            <Component
                                key={`${section.componentId}-${index}`}
                                {...section.props}
                                data-component-id={section.componentId}
                                data-order={section.order}
                            />
                        );
                    } catch (error) {
                        console.error(`❌ ComponentRenderer: Error rendering ${section.componentId}:`, error);
                        return (
                            <div key={`error-${index}`} className="bg-yellow-50 border border-yellow-200 p-8 m-4 rounded-lg">
                                <h3 className="text-yellow-800 font-semibold mb-2">Component Error</h3>
                                <p className="text-yellow-700">
                                    Failed to render <code className="bg-yellow-100 px-2 py-1 rounded">{section.componentId}</code>
                                </p>
                                <details className="mt-2">
                                    <summary className="cursor-pointer text-yellow-600 hover:text-yellow-800">
                                        View Error Details
                                    </summary>
                                    <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-auto">
              {error instanceof Error ? error.message : String(error)}
              </pre>
                                </details>
                            </div>
                        );
                    }
                })}
        </div>
    );
};

// Utils for component analysis
export const ComponentAnalyzer = {
    analyzeLayout(layout: GeneratedLayout) {
        const stats = {
            totalSections: layout.sections.length,
            categories: {} as Record<string, number>,
            hasAnimation: 0,
            hasForm: 0,
            responsive: 0
        };

        layout.sections.forEach(section => {
            const component = ComponentRegistry.getComponent(section.componentId);
            if (component) {
                const category = component.metadata.category;
                stats.categories[category] = (stats.categories[category] || 0) + 1;

                if (component.metadata.hasAnimation && section.props.animate !== false) {
                    stats.hasAnimation++;
                }
                if (component.metadata.hasForm) {
                    stats.hasForm++;
                }
                if (component.metadata.responsive) {
                    stats.responsive++;
                }
            }
        });

        return stats;
    },

    validateLayout(layout: GeneratedLayout): { valid: boolean; issues: string[] } {
        const issues: string[] = [];

        if (!layout.sections || layout.sections.length === 0) {
            issues.push('Layout has no sections');
        }

        // Check for missing components
        layout.sections.forEach(section => {
            if (!ComponentRegistry.getComponent(section.componentId)) {
                issues.push(`Component ${section.componentId} not found in registry`);
            }
        });

        // Check for duplicate orders
        const orders = layout.sections.map(s => s.order);
        const duplicateOrders = orders.filter((order, index) => orders.indexOf(order) !== index);
        if (duplicateOrders.length > 0) {
            issues.push(`Duplicate section orders: ${duplicateOrders.join(', ')}`);
        }

        // Validate theme
        if (!layout.theme.primary || !layout.theme.background) {
            issues.push('Theme is missing required colors');
        }

        return {
            valid: issues.length === 0,
            issues
        };
    }
};
