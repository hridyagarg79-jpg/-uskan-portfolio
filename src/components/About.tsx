import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
    { value: 10, suffix: '+', label: 'Projects Shipped' },
    { value: 12, suffix: '', label: 'Hackathons' },
    { value: 847, suffix: '+', label: 'Figma Frames' },
    { value: null, display: '∞', label: 'Cups of Chai' },
];

const tools = ['Figma', 'Illustrator', 'Photoshop', 'After Effects', 'Framer'];

/* ═══ ANIMATED COUNTER ═══ */
const AnimatedCounter: React.FC<{ value: number | null; suffix: string; display?: string }> = ({ value, suffix, display }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView || value === null) return;
        let start = 0;
        const end = value;
        const duration = 1800;
        const stepTime = 16;
        const totalSteps = duration / stepTime;
        const increment = end / totalSteps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [isInView, value]);

    if (display) {
        return (
            <motion.span
                ref={ref}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="text-3xl md:text-4xl font-display font-bold text-text-primary block mb-1"
            >
                {display}
            </motion.span>
        );
    }

    return (
        <span ref={ref} className="text-3xl md:text-4xl font-display font-bold text-text-primary block mb-1">
            {isInView ? count : 0}{suffix}
        </span>
    );
};

const About: React.FC = () => {
    return (
        <section className="py-28 md:py-40 max-w-5xl mx-auto px-6 md:px-16 relative">
            <div className="section-divider mb-28" />

            {/* Vertical side text */}
            <div className="hidden md:block absolute top-40 -left-6 pointer-events-none select-none">
                <span className="text-[10px] font-sans font-medium uppercase tracking-[0.5em] text-text-muted/40" style={{ writingMode: 'vertical-rl' }}>
                    About — The Designer
                </span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-accent block mb-4">
                    About
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight leading-snug mb-8">
                    I design things that feel good,
                    <br />work better, and <span className="text-gradient-violet">actually convert.</span>
                </h2>
                <p className="text-base font-sans text-text-secondary leading-[1.8] max-w-xl mb-12">
                    My obsession is invisible design — where users don't notice the interface because they're too busy achieving their goals effortlessly. That's the sweet spot.
                </p>
            </motion.div>

            {/* Bento Grid — Animated Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="glass-card rounded-2xl p-6 text-center hover:border-border-hover transition-all duration-500 glow-accent-hover"
                    >
                        <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} display={stat.display} />
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-text-muted">
                            {stat.label}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="glass-card rounded-2xl p-6"
                >
                    <p className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-accent mb-3">Education</p>
                    <p className="text-sm font-sans font-medium text-text-primary">Chitkara University</p>
                    <p className="text-xs font-sans text-text-secondary mt-1">B.E. Computer Science & Design</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-card rounded-2xl p-6"
                >
                    <p className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-accent mb-3">Tools</p>
                    <div className="flex flex-wrap gap-1.5">
                        {tools.map((t) => (
                            <span key={t} className="px-3 py-1.5 rounded-full text-[10px] font-sans tracking-wider bg-accent-dim text-accent border border-accent/10">
                                {t}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="glass-card rounded-2xl p-6 flex flex-col justify-between"
                >
                    <p className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-accent mb-3">Resume</p>
                    <a
                        href="/muskan_resume.pdf"
                        download
                        className="inline-flex items-center gap-2 text-sm font-sans font-medium text-text-primary animated-underline cursor-none hover:text-accent transition-colors duration-300"
                    >
                        <span>Download Resume</span>
                        <span className="text-lg">↓</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
