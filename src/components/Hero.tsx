import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import CategoryPills from './CategoryPills';
import Connect3D from './Connect3D';

const GlassOrb = React.lazy(() => import('./GlassOrb'));

const rotatingWords = ['startups', 'humans', 'the culture', 'impact', 'conversion'];

const Hero: React.FC = () => {
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setWordIndex(i => (i + 1) % rotatingWords.length), 2500);
        return () => clearInterval(interval);
    }, []);

    const scrollToWork = () => {
        const el = document.querySelector('#work');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        const el = document.querySelector('#contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 md:px-16 overflow-hidden">
            <Suspense fallback={null}>
                <GlassOrb />
            </Suspense>

            <div className="max-w-6xl mx-auto text-center relative z-10">
                {/* Micro-copy */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="text-[10px] font-sans font-medium uppercase tracking-[0.4em] text-text-muted mb-16"
                >
                    Move your cursor ✦ Scroll slowly
                </motion.p>

                {/* Name — massive outline typography */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6"
                >
                    <h1 className="gradient-sweep chromatic-hover text-[14vw] md:text-[10vw] font-display font-bold leading-[0.9] tracking-tighter cursor-none select-none">
                        MUSKAN
                    </h1>
                    <h1 className="gradient-sweep chromatic-hover text-[14vw] md:text-[10vw] font-display font-bold leading-[0.9] tracking-tighter cursor-none select-none">
                        GARG
                    </h1>
                </motion.div>

                {/* Role badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border bg-accent-dim mb-12"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-accent">
                        Product Designer · Creative Technologist
                    </span>
                </motion.div>

                {/* Animated subtitle with rotating words */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="max-w-2xl mx-auto mb-14"
                >
                    <p className="text-lg md:text-xl font-sans font-light text-text-secondary leading-relaxed">
                        I craft strategic, high-performing UI/UX for{' '}
                        <span className="inline-block w-[120px] md:w-[140px] text-left relative">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={wordIndex}
                                    initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                                    transition={{ duration: 0.4 }}
                                    className="text-accent font-medium absolute left-0"
                                >
                                    {rotatingWords[wordIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <MagneticButton onClick={scrollToWork}>
                        <span className="px-8 py-4 rounded-full bg-accent text-bg font-sans font-semibold text-sm uppercase tracking-[0.15em] inline-block hover:shadow-[0_0_35px_-5px_rgba(196,181,253,0.35)] transition-all duration-500">
                            View Case Studies
                        </span>
                    </MagneticButton>
                    <MagneticButton onClick={scrollToContact}>
                        <span className="px-8 py-4 rounded-full border border-border text-text-primary font-sans font-medium text-sm uppercase tracking-[0.15em] inline-block hover:border-accent hover:text-accent transition-all duration-500">
                            Let's Work Together
                        </span>
                    </MagneticButton>
                </motion.div>

                {/* Category Pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    className="flex justify-center"
                >
                    <CategoryPills />
                </motion.div>

                {/* 3D Connect Sphere */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5, duration: 1, type: 'spring', stiffness: 100 }}
                    className="mt-10 flex justify-center"
                >
                    <Connect3D />
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5, duration: 1 }}
                    className="mt-8 flex flex-col items-center cursor-none"
                    onClick={scrollToWork}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-[1px] h-12 bg-gradient-to-b from-accent/40 to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
