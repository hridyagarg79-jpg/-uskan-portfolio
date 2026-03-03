import React from 'react';
import { motion } from 'framer-motion';

const items = [
    { emoji: '🎧', label: 'Listening to', value: 'lo-fi & Dua Lipa' },
    { emoji: '📖', label: 'Reading', value: 'Refactoring UI' },
    { emoji: '🔨', label: 'Building', value: 'this portfolio' },
    { emoji: '☕', label: 'Fueled by', value: 'chai & curiosity' },
];

const CurrentlyStrip: React.FC = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-10 max-w-5xl mx-auto px-6 md:px-16"
        >
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.3em] text-accent">
                    Currently
                </span>
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                        <span className="text-sm">{item.emoji}</span>
                        <div>
                            <span className="text-[9px] font-sans uppercase tracking-[0.15em] text-text-muted block">
                                {item.label}
                            </span>
                            <span className="text-xs font-sans font-medium text-text-primary">
                                {item.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};

export default CurrentlyStrip;
