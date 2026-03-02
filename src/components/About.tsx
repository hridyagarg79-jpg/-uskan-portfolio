import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    return (
        <section className="py-28 md:py-40 max-w-5xl mx-auto px-6 md:px-16 relative">
            <div className="section-divider mb-28" />

            {/* Vertical side text */}
            <div className="hidden md:block absolute top-40 -left-6 pointer-events-none select-none">
                <span className="text-[10px] font-sans font-medium uppercase tracking-[0.5em] text-text-muted/30" style={{ writingMode: 'vertical-rl' }}>
                    About — The Designer
                </span>
            </div>

            <div className="flex flex-col md:flex-row gap-16 md:gap-20">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1"
                >
                    <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-accent block mb-4">
                        About
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight leading-snug mb-8">
                        I design things that feel good,
                        <br />work better, and <span className="text-gradient-violet">actually convert.</span>
                    </h2>
                    <div className="space-y-5 text-base font-sans font-light text-text-secondary leading-[1.8]">
                        <p>
                            I approach design as a strategic tool — not decoration. Every interface I build is grounded in user research, validated through testing, and optimized for the metrics that matter to the business.
                        </p>
                        <p>
                            My obsession is the invisible kind of design — where users don't notice the interface because they're too busy achieving their goals effortlessly. That's the sweet spot.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="md:w-64 flex flex-col gap-8"
                >
                    <div>
                        <p className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-text-muted mb-2">Education</p>
                        <p className="text-sm font-sans font-medium text-text-primary">Chitkara University</p>
                        <p className="text-xs font-sans font-light text-text-secondary">B.E. Computer Science & Design</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-text-muted mb-2">Specialization</p>
                        <p className="text-sm font-sans font-medium text-text-primary">Product & UI/UX Design</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-text-muted mb-2">Tools</p>
                        <div className="flex flex-wrap gap-1.5">
                            {['Figma', 'Illustrator', 'Photoshop', 'After Effects', 'Framer'].map((t) => (
                                <span key={t} className="px-3 py-1.5 rounded-full text-[10px] font-sans tracking-wider bg-accent-dim text-accent/70 border border-accent/10">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <a
                            href="/muskan_resume.pdf"
                            download
                            className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.15em] text-accent animated-underline cursor-none"
                        >
                            <span>Download Resume</span>
                            <span className="text-sm">↓</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
