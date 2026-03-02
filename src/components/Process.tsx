import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    { number: '01', title: 'Discover', description: 'Understand the business, users, and competitive landscape.' },
    { number: '02', title: 'Define', description: 'Synthesize research into clear problem statements and design principles.' },
    { number: '03', title: 'Design', description: 'Create wireframes, prototypes, and high-fidelity interfaces with constant iteration.' },
    { number: '04', title: 'Deliver', description: 'Pixel-perfect handoff, design systems, and documentation for seamless dev.' },
];

const Process: React.FC = () => {
    return (
        <section className="py-28 md:py-40 max-w-6xl mx-auto px-6 md:px-16 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-accent block mb-4">
                    Process
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight max-w-lg mb-20">
                    A system, not a guess.
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12, duration: 0.7 }}
                        className="relative group"
                    >
                        {/* Giant background number */}
                        <span className="text-[18vw] md:text-[8vw] font-display font-bold text-accent/[0.04] leading-none absolute -top-8 -left-2 select-none pointer-events-none group-hover:text-accent/[0.08] transition-colors duration-700">
                            {step.number}
                        </span>

                        <div className="relative pt-16">
                            <h3 className="text-lg font-display font-bold text-text-primary mb-3 tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-sm font-sans font-light text-text-secondary leading-[1.8]">
                                {step.description}
                            </p>
                        </div>

                        {/* Connector */}
                        {i < steps.length - 1 && (
                            <div className="hidden md:block absolute top-20 -right-5 w-10 h-[1px] bg-gradient-to-r from-accent/15 to-transparent" />
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Process;
