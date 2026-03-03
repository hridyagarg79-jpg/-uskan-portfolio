import React from 'react';
import { motion } from 'framer-motion';
import StaggeredText from './StaggeredText';

const blocks = [
    {
        title: 'Strategic Thinking',
        description: 'Design without strategy is decoration. I start by understanding the business, users, and competitive landscape — so every pixel earns its place.',
    },
    {
        title: 'Research-Driven',
        description: 'Assumptions are expensive. I ground decisions in real data, behavioral patterns, and validated insights — no guesswork reaching production.',
    },
    {
        title: 'Business-Focused',
        description: 'Beautiful interfaces that don\'t convert aren\'t design — they\'re art. I optimize for retention, engagement, and the metrics that matter.',
    },
];

const WhyWorkWithMe: React.FC = () => {
    return (
        <section className="py-28 md:py-40 max-w-6xl mx-auto px-6 md:px-16 relative">
            <div className="section-divider mb-28" />

            {/* Oversized background text */}
            <div className="absolute top-40 -right-10 pointer-events-none select-none">
                <span className="text-[25vw] font-display font-bold text-text-primary/[0.015] leading-none tracking-tighter block" style={{ writingMode: 'vertical-rl' }}>
                    DESIGN
                </span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-accent block mb-4">
                    What I Bring
                </span>
                <StaggeredText
                    text="Design that drives growth — not just looks good."
                    as="h2"
                    className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight max-w-lg mb-20"
                />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
                {blocks.map((block, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.8 }}
                        className="glass-card rounded-2xl p-8 hover:border-accent/20 transition-all duration-500 glow-accent-hover"
                    >
                        <span className="text-4xl font-display font-bold text-accent/10 mb-4 block">
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-lg font-display font-bold text-text-primary mb-4 tracking-tight">
                            {block.title}
                        </h3>
                        <p className="text-sm font-sans font-light text-text-secondary leading-[1.8]">
                            {block.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhyWorkWithMe;
