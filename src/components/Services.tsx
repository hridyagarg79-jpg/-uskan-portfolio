import React from 'react';
import { motion } from 'framer-motion';

const services = [
    { title: 'Product Design', description: 'End-to-end product thinking from concept to production.' },
    { title: 'UI/UX Design', description: 'Research-driven interfaces that balance form and function.' },
    { title: 'UX Audits', description: 'Find friction points and conversion blockers in existing products.' },
    { title: 'Design Systems', description: 'Scalable component libraries and design tokens.' },
    { title: 'Landing Page Optimization', description: 'High-converting pages built on behavioral data.' },
];

const Services: React.FC = () => {
    return (
        <section className="py-28 md:py-40 max-w-6xl mx-auto px-6 md:px-16 relative">
            <div className="section-divider mb-28" />

            {/* Oversized bg text */}
            <div className="absolute top-28 left-0 right-0 pointer-events-none select-none overflow-hidden">
                <span className="text-[15vw] font-display font-bold text-text-primary/[0.012] leading-none tracking-tighter whitespace-nowrap block">
                    INTERACTION LAB
                </span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-accent block mb-4">
                    Interaction Lab
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight max-w-lg mb-20">
                    What I can do for you.
                </h2>
            </motion.div>

            <div className="space-y-0">
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.6 }}
                        className="flex flex-col md:flex-row md:items-center justify-between py-7 border-b border-border group cursor-none hover:pl-3 transition-all duration-500"
                    >
                        <div className="flex items-center gap-6">
                            <span className="text-sm font-sans text-text-muted font-light w-8">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-lg md:text-xl font-display font-bold text-text-primary group-hover:text-accent transition-colors duration-500 tracking-tight animated-underline">
                                {service.title}
                            </h3>
                        </div>
                        <p className="text-sm font-sans font-light text-text-secondary md:max-w-sm mt-2 md:mt-0 md:text-right leading-relaxed">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Services;
