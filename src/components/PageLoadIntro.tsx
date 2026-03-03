import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoadIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [phase, setPhase] = useState<'logo' | 'expand' | 'done'>('logo');

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('expand'), 1800);
        const t2 = setTimeout(() => {
            setPhase('done');
            onComplete();
        }, 2800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="fixed inset-0 z-[9998] flex items-center justify-center"
                    style={{ backgroundColor: '#0E0E12' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Background grain */}
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                            backgroundSize: '128px 128px',
                        }}
                    />

                    {/* Logo container */}
                    <div className="relative">
                        {/* MG. text */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                            animate={
                                phase === 'logo'
                                    ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                                    : { opacity: 0, scale: 1.5, filter: 'blur(8px)' }
                            }
                            transition={{
                                duration: phase === 'logo' ? 1.2 : 0.8,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="text-center"
                        >
                            <span className="text-6xl md:text-8xl font-display font-bold text-text-primary tracking-tighter">
                                MG.
                            </span>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="text-[9px] font-sans uppercase tracking-[0.5em] text-text-muted mt-4"
                            >
                                Product Designer · Creative Technologist
                            </motion.p>
                        </motion.div>

                        {/* Accent line */}
                        <motion.div
                            className="absolute -bottom-8 left-1/2 h-[1px] bg-accent"
                            initial={{ width: 0, x: '-50%' }}
                            animate={{ width: phase === 'logo' ? 80 : 0, x: '-50%' }}
                            transition={{ delay: phase === 'logo' ? 0.8 : 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </div>

                    {/* Progress dots */}
                    <div className="absolute bottom-16 flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1 h-1 rounded-full bg-accent"
                                initial={{ opacity: 0.2 }}
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{
                                    duration: 1,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageLoadIntro;
