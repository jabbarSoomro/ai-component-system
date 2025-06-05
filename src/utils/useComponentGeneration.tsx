import { useState, useCallback } from 'react';
import { ComponentGenerator, GenerationPrompt, GeneratedLayout } from '../ai/ComponentGenerator';

export const useComponentGeneration = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedLayout, setGeneratedLayout] = useState<GeneratedLayout | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<GeneratedLayout[]>([]);

    const generateLayout = useCallback(async (prompt: GenerationPrompt) => {
        console.log('🎯 useComponentGeneration: Starting generation with prompt', prompt);
        setIsGenerating(true);
        setError(null);

        try {
            // Simulate API delay for better UX (in real app, this would be an API call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            const layout = ComponentGenerator.generateLayout(prompt);

            setGeneratedLayout(layout);
            setHistory(prev => [layout, ...prev.slice(0, 9)]); // Keep last 10 generations

            console.log('✅ useComponentGeneration: Generation completed successfully');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred during generation';
            setError(errorMessage);
            console.error('❌ useComponentGeneration: Generation failed', err);
        } finally {
            setIsGenerating(false);
        }
    }, []);

    const clearLayout = useCallback(() => {
        setGeneratedLayout(null);
        setError(null);
        console.log('🧹 useComponentGeneration: Layout cleared');
    }, []);

    const regenerateLayout = useCallback(() => {
        if (generatedLayout?.metadata.prompt) {
            generateLayout(generatedLayout.metadata.prompt);
        }
    }, [generatedLayout, generateLayout]);

    const loadFromHistory = useCallback((layout: GeneratedLayout) => {
        setGeneratedLayout(layout);
        setError(null);
    }, []);

    const exportLayout = useCallback(() => {
        if (generatedLayout) {
            const dataStr = JSON.stringify(generatedLayout, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

            const exportFileDefaultName = `layout-${generatedLayout.metadata.industry}-${Date.now()}.json`;

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        }
    }, [generatedLayout]);

    return {
        generateLayout,
        clearLayout,
        regenerateLayout,
        loadFromHistory,
        exportLayout,
        isGenerating,
        generatedLayout,
        error,
        history
    };
};
