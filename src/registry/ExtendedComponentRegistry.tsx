import ComponentRegistry from './ComponentRegistry';

// Import Hero Components
import HeroCenteredMinimal from '../components/hero/HeroCenteredMinimal';
import HeroCenteredDark from '../components/hero/HeroCenteredDark';
import HeroSplitBold from '../components/hero/HeroSplitBold';
import HeroCenteredGradient from '../components/hero/HeroCenteredGradient';
import HeroSplitImageHeavy from '../components/hero/HeroSplitImageHeavy';

// Import Navigation Components
import NavMinimal from '../components/navigation/NavMinimal';
import NavDark from '../components/navigation/NavDark';
import NavDropdown from '../components/navigation/NavDropdown';

// Import Footer Components
import FooterMinimal from '../components/footer/FooterMinimal';
import FooterDark from '../components/footer/FooterDark';

// Import Feature Components
import FeatureGridMinimal from '../components/features/FeatureGridMinimal';
import FeatureAlternatingBold from '../components/features/FeatureAlternatingBold';

// Import Other Components
import PricingCardsMinimal from '../components/pricing/PricingCardsMinimal';
import TestimonialGridMinimal from '../components/testimonials/TestimonialGridMinimal';
import CTACenteredMinimal from '../components/cta/CTACenteredMinimal';
import ContactFormSplit from '../components/contact/ContactFormSplit';
import NewsletterCenteredMinimal from '../components/newsletter/NewsletterCenteredMinimal';
import StatsGridMinimal from '../components/stats/StatsGridMinimal';
import FAQAccordion from '../components/faq/FAQAccordion';

// Hero Component Metadata
const heroMetadata = {
    hero01: {
        id: "hero01",
        category: "Hero",
        layoutType: "Centered",
        tone: "Minimal",
        styleTags: ["minimal", "clean", "whitespace-driven"],
        contentVariants: ["withImage", "withoutImage", "singleCTA", "dualCTA"],
        useCases: ["SaaS Homepage", "Landing Page", "Product Launch"],
        industryTags: ["Technology", "SaaS", "Startup"],
        hasForm: false,
        hasImage: true,
        hasAnimation: true,
        responsive: true
    },
    hero02: {
        id: "hero02",
        category: "Hero",
        layoutType: "Centered",
        tone: "Dark",
        styleTags: ["dark", "gradient", "modern"],
        contentVariants: ["withImage", "withoutImage", "singleCTA", "dualCTA"],
        useCases: ["Tech Product", "Gaming", "Creative Agency"],
        industryTags: ["Technology", "Gaming", "Creative"],
        hasForm: false,
        hasImage: true,
        hasAnimation: true,
        responsive: true
    },
    hero03: {
        id: "hero03",
        category: "Hero",
        layoutType: "Split",
        tone: "Bold",
        styleTags: ["bold", "strong-typography", "high-contrast"],
        contentVariants: ["withImage", "withStats", "singleCTA", "dualCTA"],
        useCases: ["Marketing Agency", "Fitness", "E-commerce"],
        industryTags: ["Marketing", "Fitness", "E-commerce"],
        hasForm: false,
        hasImage: true,
        hasAnimation: true,
        responsive: true
    },
    hero04: {
        id: "hero04",
        category: "Hero",
        layoutType: "Centered",
        tone: "Gradient",
        styleTags: ["gradient", "modern", "glassmorphism"],
        contentVariants: ["withBadge", "withImage", "singleCTA", "dualCTA"],
        useCases: ["SaaS Product", "App Landing", "Tech Startup"],
        industryTags: ["Technology", "SaaS", "Mobile Apps"],
        hasForm: false,
        hasImage: true,
        hasAnimation: true,
        responsive: true
    },
    hero05: {
        id: "hero05",
        category: "Hero",
        layoutType: "Split",
        tone: "Image-Heavy",
        styleTags: ["image-heavy", "photography", "minimal-text"],
        contentVariants: ["withImage", "singleCTA"],
        useCases: ["Portfolio", "Photography", "Travel"],
        industryTags: ["Photography", "Travel", "Creative"],
        hasForm: false,
        hasImage: true,
        hasAnimation: true,
        responsive: true
    }
};

// Register all Hero Components
ComponentRegistry.registerComponent('hero01', HeroCenteredMinimal, heroMetadata.hero01);
ComponentRegistry.registerComponent('hero02', HeroCenteredDark, heroMetadata.hero02);
ComponentRegistry.registerComponent('hero03', HeroSplitBold, heroMetadata.hero03);
ComponentRegistry.registerComponent('hero04', HeroCenteredGradient, heroMetadata.hero04);
ComponentRegistry.registerComponent('hero05', HeroSplitImageHeavy, heroMetadata.hero05);

// Navigation Components
ComponentRegistry.registerComponent('nav01', NavMinimal, {
    id: "nav01",
    category: "Navigation",
    layoutType: "Horizontal",
    tone: "Minimal",
    styleTags: ["minimal", "clean", "backdrop-blur"],
    contentVariants: ["withCTA", "withoutCTA", "withLogo", "sticky"],
    useCases: ["SaaS", "Portfolio", "Blog"],
    industryTags: ["Technology", "Creative", "Business"],
    hasForm: false,
    hasImage: true,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('nav02', NavDark, {
    id: "nav02",
    category: "Navigation",
    layoutType: "Horizontal",
    tone: "Dark",
    styleTags: ["dark", "gradient", "glow-effects"],
    contentVariants: ["withCTA", "withoutCTA", "withLogo", "sticky"],
    useCases: ["Gaming", "Tech", "Creative"],
    industryTags: ["Gaming", "Technology", "Creative"],
    hasForm: false,
    hasImage: true,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('nav03', NavDropdown, {
    id: "nav03",
    category: "Navigation",
    layoutType: "Horizontal",
    tone: "Professional",
    styleTags: ["professional", "dropdown", "mega-menu"],
    contentVariants: ["withDropdown", "withCTA", "withAuth", "sticky"],
    useCases: ["Enterprise", "E-commerce", "Corporate"],
    industryTags: ["Enterprise", "E-commerce", "Corporate"],
    hasForm: false,
    hasImage: true,
    hasAnimation: true,
    responsive: true
});

// Register all other components with their metadata...
ComponentRegistry.registerComponent('footer01', FooterMinimal, {
    id: "footer01",
    category: "Footer",
    layoutType: "Multi-column",
    tone: "Minimal",
    styleTags: ["minimal", "clean", "newsletter"],
    contentVariants: ["withNewsletter", "withSocial", "multiColumn"],
    useCases: ["SaaS", "Blog", "Portfolio"],
    industryTags: ["Technology", "Business", "Creative"],
    hasForm: true,
    hasImage: true,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('footer02', FooterDark, {
    id: "footer02",
    category: "Footer",
    layoutType: "Multi-column",
    tone: "Dark",
    styleTags: ["dark", "gradient", "pattern-background"],
    contentVariants: ["withNewsletter", "withSocial", "multiColumn"],
    useCases: ["Gaming", "Tech", "Agency"],
    industryTags: ["Gaming", "Technology", "Creative"],
    hasForm: true,
    hasImage: true,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('feature01', FeatureGridMinimal, {
    id: "feature01",
    category: "Features",
    layoutType: "Grid",
    tone: "Minimal",
    styleTags: ["minimal", "clean", "grid-based"],
    contentVariants: ["3-column", "4-column", "withIcons", "withoutIcons"],
    useCases: ["SaaS Features", "Product Benefits", "Service Overview"],
    industryTags: ["Technology", "SaaS", "Business"],
    hasForm: false,
    hasImage: false,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('feature02', FeatureAlternatingBold, {
    id: "feature02",
    category: "Features",
    layoutType: "Alternating",
    tone: "Bold",
    styleTags: ["bold", "alternating", "image-heavy"],
    contentVariants: ["withBadge", "withImage", "alternatingLayout"],
    useCases: ["Product Showcase", "Feature Deep Dive", "Benefits"],
    industryTags: ["E-commerce", "Marketing", "SaaS"],
    hasForm: false,
    hasImage: true,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('pricing01', PricingCardsMinimal, {
    id: "pricing01",
    category: "Pricing",
    layoutType: "Cards",
    tone: "Minimal",
    styleTags: ["minimal", "cards", "toggle", "popular"],
    contentVariants: ["withToggle", "withBadge", "withPopular", "3-column"],
    useCases: ["SaaS Pricing", "Subscription Plans", "Service Packages"],
    industryTags: ["SaaS", "Technology", "Business"],
    hasForm: false,
    hasImage: false,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('testimonial01', TestimonialGridMinimal, {
    id: "testimonial01",
    category: "Testimonials",
    layoutType: "Grid",
    tone: "Minimal",
    styleTags: ["minimal", "grid", "rating", "avatar"],
    contentVariants: ["withRating", "withAvatar", "3-column", "quote-style"],
    useCases: ["Customer Reviews", "Social Proof", "Case Studies"],
    industryTags: ["SaaS", "E-commerce", "Business"],
    hasForm: false,
    hasImage: true,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('cta01', CTACenteredMinimal, {
    id: "cta01",
    category: "CTA",
    layoutType: "Centered",
    tone: "Minimal",
    styleTags: ["minimal", "centered", "dual-button"],
    contentVariants: ["singleCTA", "dualCTA", "withDescription"],
    useCases: ["Newsletter Signup", "Product Trial", "Contact"],
    industryTags: ["SaaS", "Technology", "Business"],
    hasForm: false,
    hasImage: false,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('contact01', ContactFormSplit, {
    id: "contact01",
    category: "Contact",
    layoutType: "Split",
    tone: "Professional",
    styleTags: ["professional", "split-layout", "form", "map"],
    contentVariants: ["withForm", "withMap", "withContactInfo"],
    useCases: ["Contact Page", "Support", "Business Contact"],
    industryTags: ["Business", "Corporate", "Service"],
    hasForm: true,
    hasImage: false,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('newsletter01', NewsletterCenteredMinimal, {
    id: "newsletter01",
    category: "Newsletter",
    layoutType: "Centered",
    tone: "Minimal",
    styleTags: ["minimal", "centered", "incentive", "success-state"],
    contentVariants: ["withIncentive", "withPrivacy", "successState"],
    useCases: ["Newsletter Signup", "Lead Generation", "Email Capture"],
    industryTags: ["Marketing", "Business", "Content"],
    hasForm: true,
    hasImage: false,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('stats01', StatsGridMinimal, {
    id: "stats01",
    category: "Stats",
    layoutType: "Grid",
    tone: "Minimal",
    styleTags: ["minimal", "grid", "count-up", "cards"],
    contentVariants: ["withIcons", "withDescription", "countUp", "4-column"],
    useCases: ["Company Metrics", "Performance Data", "Achievement Stats"],
    industryTags: ["Business", "SaaS", "Corporate"],
    hasForm: false,
    hasImage: false,
    hasAnimation: true,
    responsive: true
});

ComponentRegistry.registerComponent('faq01', FAQAccordion, {
    id: "faq01",
    category: "FAQ",
    layoutType: "Accordion",
    tone: "Professional",
    styleTags: ["professional", "accordion", "expandable"],
    contentVariants: ["accordion", "withCategories", "searchable"],
    useCases: ["Product FAQ", "Support", "Documentation"],
    industryTags: ["SaaS", "Business", "Support"],
    hasForm: false,
    hasImage: false,
    hasAnimation: true,
    responsive: true
});

console.log('🚀 Component Registry: All components registered successfully');
console.log('📊 Registry Stats:', ComponentRegistry.getStats());

export default ComponentRegistry;