export interface PersonaData {
    name: string;
    age: string;
    occupation: string;
    goals: string[];
    painPoints: string[];
    quote: string;
}

export interface JourneyStage {
    stage: string;
    action: string;
    emotion: 'positive' | 'neutral' | 'negative';
    touchpoint: string;
    thought: string;
}

export interface StoryboardPanel {
    scene: string;
    description: string;
    imageHint: string;
}

export interface FlashCard {
    front: string;
    back: string;
    accent: string;
}

export interface InsightItem {
    number: string;
    title: string;
    description: string;
    accent: string;
}

export interface ProjectData {
    slug: string;
    title: string;
    category: string;
    tagline: string;
    image: string;
    description: string;
    role: string;
    timeline: string;
    tools: string[];
    overview: string;
    coreProblem: string;
    coreProblemDetail: string;
    personas: PersonaData[];
    journey: JourneyStage[];
    storyboard: StoryboardPanel[];
    flashCards: FlashCard[];
    processSteps: string[];
    screens: string[];
    insights: InsightItem[];
}

export const projects: ProjectData[] = [
    {
        slug: 'dots-brand-system',
        title: 'Dots — Complete Brand System',
        category: 'Brand Identity · Advertising · Print',
        tagline: 'End-to-end brand system for a social platform — from visual identity to billboards to business cards.',
        image: '/images/dots_logo.png',
        description: 'A complete brand ecosystem: visual identity, OOH advertising, and premium stationery — all built from one core idea.',
        role: 'Lead Brand Designer',
        timeline: '7 Weeks',
        tools: ['Figma', 'Illustrator', 'Photoshop', 'After Effects', 'InDesign', 'Dimension'],
        overview: 'Dots is a social networking platform built on the idea that human connection should feel organic, not algorithmic. This project encompassed the entire brand universe — from the founding visual identity and logo system, through large-scale Out-of-Home advertising campaigns designed to stop traffic at 60 mph, to a premium stationery suite engineered to make a tactile impression that digital can\'t replicate. The challenge was building a brand that breathes the same personality at every scale: a 16px favicon, a 48-sheet highway billboard, and the weight of a business card in your hand. Secured 2nd Place at Design Fusion S3 Hackathon (280+ global teams).',
        coreProblem: 'How do you build a brand system that feels equally human whether it\'s a 16-pixel icon or a 20-foot billboard — and makes a stranger want to keep your business card?',
        coreProblemDetail: 'Social platforms default to corporate visual tropes: connected nodes, globe icons, speech bubbles wrapped in gradients. They look interchangeable at any scale. Dots needed a visual language that breaks this pattern entirely — warm, asymmetric, memorable — and then survive the brutal translation from pixel-perfect screens to the uncontrolled environments of highways, bus shelters, metro stations, and the human hand holding 400gsm cotton card stock. Three mediums, three sets of constraints, one unified identity.',
        personas: [
            {
                name: 'Priya K.',
                age: '24',
                occupation: 'Freelance Designer',
                goals: [
                    'Find a platform that feels creative and authentic',
                    'Connect with like-minded people without algorithm interference',
                    'Share work in a space that values quality over quantity',
                    'Feel part of a community, not a user base'
                ],
                painPoints: [
                    'Existing platforms feel corporate and impersonal',
                    'Algorithm-driven feeds bury genuine content',
                    'Visual noise makes everything look the same',
                    'No platform reflects her taste and creative sensibility'
                ],
                quote: '"I want a social space that feels like a studio, not a marketplace."'
            },
            {
                name: 'Arjun M.',
                age: '28',
                occupation: 'Product Manager',
                goals: [
                    'Network with professionals in a relaxed environment',
                    'Discover interesting people organically, not through cold DMs',
                    'Have meaningful conversations, not just likes and hearts',
                    'Carry a business card that starts conversations itself'
                ],
                painPoints: [
                    'LinkedIn feels performative and over-optimized',
                    'Twitter/X is too chaotic for real connection',
                    'No platform balances the professional and the personal well',
                    'Generic business cards get tossed immediately'
                ],
                quote: '"Why does networking have to feel so transactional?"'
            },
            {
                name: 'Rohan S.',
                age: '30',
                occupation: 'Commuter / Tech Lead',
                goals: [
                    'Notice something that breaks visual monotony on his commute',
                    'Quickly understand what a brand is about',
                    'Remember the brand when he\'s home later that evening'
                ],
                painPoints: [
                    'Billboard blindness from generic advertising everywhere',
                    'Too much text to process while driving at speed',
                    'Brands that look different across channels feel unreliable'
                ],
                quote: '"I notice maybe one billboard per month. Make it count."'
            }
        ],
        journey: [
            { stage: 'Awareness', action: 'Sees Dots billboard during morning commute — just the mark, no text', emotion: 'positive', touchpoint: 'OOH Billboard', thought: '"Those colored circles are interesting — what is that?"' },
            { stage: 'Repetition', action: 'Spots the same mark on a bus shelter the next day', emotion: 'positive', touchpoint: 'Transit Ad', thought: '"I\'ve seen that before — it\'s called Dots"' },
            { stage: 'Discovery', action: 'Searches for Dots online, finds the landing page', emotion: 'positive', touchpoint: 'Landing Page', thought: '"The brand feels consistent — same energy online"' },
            { stage: 'First Touch', action: 'Downloads app, completes onboarding in 30 seconds', emotion: 'positive', touchpoint: 'App Onboarding', thought: '"This is smooth — no friction at all"' },
            { stage: 'Connection', action: 'Finds and connects with 3 designers whose work resonates', emotion: 'positive', touchpoint: 'Core App', thought: '"This feels authentic, not algorithmic"' },
            { stage: 'Physical', action: 'Receives a Dots business card at a meetup — notices the weight', emotion: 'positive', touchpoint: 'Business Card', thought: '"This card feels premium — there\'s a hidden UV pattern!"' },
            { stage: 'Advocacy', action: 'Shows the card to a colleague, recommends the platform', emotion: 'positive', touchpoint: 'Word of Mouth', thought: '"Everyone needs to try this — and feel this card"' },
        ],
        storyboard: [
            { scene: 'The Billboard', description: 'Morning commute. Among visual clutter, one billboard stands out — just the Dots mark at 20 feet tall against a clean background. No tagline. No URL. Just the mark. It\'s confident enough to stand alone.', imageHint: 'Highway billboard' },
            { scene: 'The Bus Shelter', description: 'Two days later, waiting for the bus. The same mark appears again, smaller, with a single line: "Connect differently." Pattern recognition kicks in — the brand is building mental real estate.', imageHint: 'Bus stop ad' },
            { scene: 'The Landing Page', description: 'Curiosity wins. A search leads to a landing page with the same colors, the same energy, the same asymmetric personality. The transition from physical to digital is seamless.', imageHint: 'Landing page' },
            { scene: 'The App', description: 'Three onboarding screens. No tutorials. Profile ready in 30 seconds. Within minutes, three designers whose work genuinely resonates. The first "dot" sent — a lightweight connection request.', imageHint: 'App screens' },
            { scene: 'The Card', description: 'At a design meetup, someone hands you a Dots card. The weight registers immediately — this isn\'t ordinary cardstock. You tilt it under light and discover raised dots: spot UV. A hidden layer of identity. This card doesn\'t end up in a drawer.', imageHint: 'Business card reveal' },
            { scene: 'The Conversation', description: '"Have you seen this card?" Arjun shows it to a colleague. The card itself becomes a talking point. The brand converts through physical delight — the card earns the app download.', imageHint: 'Card sharing' },
        ],
        flashCards: [
            { front: 'Why asymmetric?', back: 'The asymmetric dot cluster feels organic and fundamentally human — perfectly imperfect, like real connections between real people. Symmetry is corporate. Asymmetry is alive.', accent: '#E8C4C4' },
            { front: 'Color strategy', back: 'Each dot gets a unique pastel from the palette: dusty rose, sage green, muted clay. Together they represent diversity within unity — different people, one community.', accent: '#C6D5C0' },
            { front: 'The 3-second rule', back: 'Every OOH placement was tested for comprehension within 3 seconds at simulated distances. If you can\'t understand it at a glance from a moving car, it fails.', accent: '#D6C5B3' },
            { front: 'Scale invariance', back: 'The mark works identically from a 16×16 favicon to a 48-sheet billboard. We tested at 14 different sizes before finalizing the geometry.', accent: '#E8C4C4' },
            { front: 'Tactile engineering', back: 'Business cards use 400gsm cotton-blend stock with soft-touch laminate. The spot UV dots are invisible until you tilt the card — a hidden discovery moment.', accent: '#C6D5C0' },
            { front: 'Zero-text billboard', back: 'The strongest OOH execution used zero words — just the Dots mark at 20 feet. Brand recognition through pure form outperformed every text-heavy variant.', accent: '#D6C5B3' },
            { front: 'Edge painting', back: 'Business card edges are painted in dusty rose — visible when cards are stacked, invisible when single. A detail only noticed by people who pay attention.', accent: '#E8C4C4' },
            { front: 'Motion principle', back: 'In digital contexts, dots gently pulse and orbit — suggesting life and connection without being distracting. Movement sells the metaphor.', accent: '#C6D5C0' },
        ],
        processSteps: [
            'Phase 1 — Research: Analyzed 15+ social platform identities to map visual fatigue patterns. Studied Apple, Spotify, and Nike OOH campaigns for attention mechanics.',
            'Phase 2 — Concept: Developed the "dots" metaphor — each dot represents a person, connections form through proximity and color. Iterated through 40+ logo concepts.',
            'Phase 3 — Identity System: Built the complete design system: logo variations, color palette (5 pastels), typography scale, spacing grid, and a 60-component library.',
            'Phase 4 — OOH Campaign: Designed modular layouts for highways, bus shelters, metro stations. Tested at simulated driving distances. Created location-aware adaptations.',
            'Phase 5 — Print Collateral: Engineered the stationery suite: 400gsm cotton cards with spot UV, edge painting, embossed letterhead, and branded packaging.',
            'Phase 6 — Validation: Tested the identity across 14 touchpoints from 16px favicon to 48-sheet billboard. Presented at Design Fusion S3, secured 2nd place globally.',
        ],
        screens: [
            '/images/dots_logo.png',
            '/images/dots_billboard.png',
            '/images/dots_businesscard.png',
        ],
        insights: [
            { number: '01', title: 'Simplicity Scales', description: 'The simplest marks are the most versatile. The Dots logo works because it reduces connection to its purest geometric form — something a child could draw but a designer would respect.', accent: 'text-dusty-rose' },
            { number: '02', title: 'Imperfection Is Memorable', description: 'The asymmetric cluster deliberately breaks from corporate symmetry. This makes it instantly recognizable — your brain remembers irregularity longer than perfection.', accent: 'text-sage-green' },
            { number: '03', title: 'Physical Matters', description: 'In a digital-first world, the tactile experience of a premium business card creates disproportionate brand impact. The card became the strongest conversion tool — stronger than any ad.', accent: 'text-muted-clay' },
            { number: '04', title: 'System > Single Asset', description: 'Building a design language (not just a logo) ensured day-one consistency across 14+ touchpoints. The system prevented visual fragmentation before it could start.', accent: 'text-dusty-rose' },
            { number: '05', title: 'Context Is Content', description: 'A billboard on a highway needs to be read at 60 mph. A business card is held 12 inches from your face. The same brand must feel right in both contexts — or it feels right in neither.', accent: 'text-sage-green' },
        ],
    },
    {
        slug: 'scarface-poster',
        title: 'Scarface Poster',
        category: 'Poster Design',
        tagline: 'A gritty, high-contrast reimagining of the classic Scarface aesthetic.',
        image: '/images/scarface_poster.png',
        description: 'A passion project reinterpreting a cultural icon through contemporary design.',
        role: 'Graphic Designer',
        timeline: '1 Week',
        tools: ['Photoshop', 'Illustrator', 'Lightroom'],
        overview: 'A passion project to reinterpret a cultural cinematic icon through a contemporary design lens. The goal was to create something gallery-worthy that honors the original\'s raw energy while standing confidently as an independent design piece — not fan art, but a design statement about how constraint breeds creativity.',
        coreProblem: 'How do you reinterpret a cultural icon through contemporary design without losing the raw energy that makes Scarface iconic?',
        coreProblemDetail: 'Fan art exists everywhere. Most of it either copies the original too closely (just a filter on a screenshot) or strays so far it loses the emotional connection. The challenge was finding the narrow space between homage and original work — respecting the source material while bringing a genuinely fresh visual language that earns its place on a gallery wall.',
        personas: [
            {
                name: 'Design Community',
                age: 'Various',
                occupation: 'Designers, Art Directors, Film Lovers',
                goals: [
                    'See familiar subjects through unexpectedly fresh lenses',
                    'Appreciate technical craft in poster design',
                    'Find inspiration for their own reinterpretation work',
                    'Encounter design that makes them stop scrolling'
                ],
                painPoints: [
                    'Most fan art is derivative — filters on screenshots',
                    'Typography in movie posters is usually an afterthought',
                    'Conceptual depth is rare in poster reimaginings',
                    'Design feeds are full of safe, predictable work'
                ],
                quote: '"Show me something I\'ve seen a thousand times, but make me see it for the first time."'
            }
        ],
        journey: [
            { stage: 'Scroll', action: 'Encounters the poster in a design feed', emotion: 'positive', touchpoint: 'Behance / Dribbble', thought: '"Wait — that\'s Scarface but it looks completely different"' },
            { stage: 'Study', action: 'Zooms in to examine halftone and duotone technique', emotion: 'positive', touchpoint: 'Image viewer', thought: '"The craft here is incredible — how was this made?"' },
            { stage: 'Appreciate', action: 'Reads the editorial typography choices', emotion: 'positive', touchpoint: 'Full view', thought: '"Type as image, not as label. Smart."' },
            { stage: 'Share', action: 'Saves and sends to designer friends', emotion: 'positive', touchpoint: 'Social sharing', thought: '"Everyone needs to see this reinterpretation"' },
        ],
        storyboard: [
            { scene: 'The Challenge', description: 'Self-set brief: take Scarface and create a gallery-quality poster using only duotone, halftone, and typography. No color photos, no screenshots, no shortcuts.', imageHint: 'Brief document' },
            { scene: 'Research Board', description: 'Studying the original 1983 poster, DVD covers, and 8 key film stills to extract the visual DNA — what makes Scarface look like Scarface?', imageHint: 'Mood board' },
            { scene: 'The Execution', description: 'High-contrast duotone with deep black and burned red. Heavy halftone dots dissolve into smooth gradients at distance. Typography integrated as a compositional element, not a label.', imageHint: 'Process shots' },
        ],
        flashCards: [
            { front: 'Duotone choice', back: 'Deep black and burned red — stripping away all color except what carries the most emotional weight. Red = blood, power, violence. Black = shadow, mystery, consequence.', accent: '#E8C4C4' },
            { front: 'Halftone technique', back: 'Heavy halftone dots visible at reading distance dissolve into smooth photographic gradients from across a room — print-era nostalgia meets contemporary minimalism.', accent: '#C6D5C0' },
            { front: 'Type as image', back: 'Typography was treated as a compositional element that integrates with the image rather than floating on top. The text IS part of the portrait.', accent: '#D6C5B3' },
            { front: 'Constraint = Freedom', back: 'Limiting the palette to exactly two colors and one texture technique forced every decision to earn its place. Nothing is arbitrary.', accent: '#E8C4C4' },
        ],
        processSteps: [
            'Studied the 1983 original poster, DVD covers, and fan art ecosystem to understand what defines the Scarface visual identity.',
            'Developed a high-contrast duotone technique: every detail either becomes deep black or burned red. No middle ground.',
            'Applied halftone textures at varying densities, grain overlays at 40% for print-era texture, and aggressive red accents.',
            'Integrated typography as image — the type is part of the composition, not a layer on top of it.',
            'Final refinement: tested at print resolution (300 DPI at 24×36 inches) to ensure the halftone effect works at actual poster scale.',
        ],
        screens: ['/images/scarface_poster.png'],
        insights: [
            { number: '01', title: 'Constraint Breeds Creativity', description: 'Limiting the palette to two colors and one texture forced every compositional decision to work exponentially harder. Less didn\'t just mean more — it meant better.', accent: 'text-dusty-rose' },
            { number: '02', title: 'Typography Is Design', description: 'Treating type as image (not label) elevated the poster from fan art to independent design work. The text is inseparable from the portrait.', accent: 'text-sage-green' },
            { number: '03', title: 'Homage ≠ Copy', description: 'The best reinterpretation work respects the source material\'s emotional core while bringing a completely new visual language.', accent: 'text-muted-clay' },
        ],
    },
];

export const getProjectBySlug = (slug: string): ProjectData | undefined => {
    return projects.find(p => p.slug === slug);
};

export const getNextProject = (currentSlug: string): ProjectData => {
    const currentIndex = projects.findIndex(p => p.slug === currentSlug);
    const nextIndex = (currentIndex + 1) % projects.length;
    return projects[nextIndex];
};

export const getPrevProject = (currentSlug: string): ProjectData => {
    const currentIndex = projects.findIndex(p => p.slug === currentSlug);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    return projects[prevIndex];
};
