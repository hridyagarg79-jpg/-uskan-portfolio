import React from 'react';

const items = [
    'typography', 'matcha lattes', 'Figma plugins', 'film grain', 'grid systems',
    'lo-fi beats', 'Swiss design', 'color theory', 'micro-interactions', 'dark mode',
    'design systems', 'bold serifs', 'whitespace', 'motion design', 'pixel perfection',
    'coffee shops', 'late night designing', 'clean code', 'aesthetic chaos',
];

const Obsessions: React.FC = () => {
    const doubled = [...items, ...items];

    return (
        <section className="py-12 overflow-hidden border-y border-border">
            <div className="flex animate-marquee whitespace-nowrap">
                {doubled.map((item, i) => (
                    <span key={i} className="mx-6 text-sm font-sans font-light text-text-secondary flex items-center gap-6 shrink-0">
                        {item}
                        <span className="text-accent/40 text-[8px]">✦</span>
                    </span>
                ))}
            </div>
        </section>
    );
};

export default Obsessions;
