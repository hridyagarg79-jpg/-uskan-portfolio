import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    angle: number;
    speed: number;
    delay: number;
}

const colors = ['#C4B5FD', '#F0C6D4', '#B8D4C7', '#FFFFFF', '#A78BFA'];

const PageLoadIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [phase, setPhase] = useState<'enter' | 'burst' | 'exit' | 'done'>('enter');

    const particles: Particle[] = useMemo(() =>
        Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: 0,
            y: 0,
            size: 2 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            angle: (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.5,
            speed: 150 + Math.random() * 250,
            delay: Math.random() * 0.15,
        })), []);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('burst'), 1600);
        const t2 = setTimeout(() => setPhase('exit'), 2400);
        const t3 = setTimeout(() => {
            setPhase('done');
            onComplete();
        }, 3200);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: '#0E0E12', perspective: '1200px' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Grain */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                            backgroundSize: '128px 128px',
                        }}
                    />

                    {/* Particle burst from center */}
                    {(phase === 'burst' || phase === 'exit') && particles.map((p) => (
                        <motion.div
                            key={p.id}
                            className="absolute rounded-full"
                            style={{
                                width: p.size,
                                height: p.size,
                                backgroundColor: p.color,
                                left: '50%',
                                top: '50%',
                            }}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                            animate={{
                                x: Math.cos(p.angle) * p.speed,
                                y: Math.sin(p.angle) * p.speed,
                                opacity: [1, 1, 0],
                                scale: 1,
                            }}
                            transition={{
                                duration: 1.2,
                                delay: p.delay,
                                ease: 'easeOut',
                            }}
                        />
                    ))}

                    {/* 3D rotating MG. text */}
                    <motion.div
                        className="relative text-center"
                        style={{ transformStyle: 'preserve-3d' }}
                        initial={{ rotateX: 90, opacity: 0, scale: 0.7 }}
                        animate={
                            phase === 'enter'
                                ? { rotateX: 0, opacity: 1, scale: 1 }
                                : { rotateX: -30, opacity: 0, scale: 1.3, filter: 'blur(8px)' }
                        }
                        transition={{
                            duration: phase === 'enter' ? 1.2 : 0.7,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <span className="text-7xl md:text-9xl font-display font-bold text-text-primary tracking-tighter block">
                            MG.
                        </span>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: phase === 'enter' ? 1 : 0, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-[9px] font-sans uppercase tracking-[0.5em] text-text-muted mt-4"
                        >
                            Product Designer · Creative Technologist
                        </motion.p>
                    </motion.div>

                    {/* Accent line below logo */}
                    <motion.div
                        className="absolute h-[1px] bg-accent"
                        style={{ top: '55%', left: '50%', translateX: '-50%' }}
                        initial={{ width: 0 }}
                        animate={{ width: phase === 'enter' ? 80 : 0 }}
                        transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Progress dots */}
                    <div className="absolute bottom-16 flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1 h-1 rounded-full bg-accent"
                                initial={{ opacity: 0.2 }}
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageLoadIntro;
