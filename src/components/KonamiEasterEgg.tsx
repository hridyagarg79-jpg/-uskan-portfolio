import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

const confettiColors = ['#C4B5FD', '#F0C6D4', '#B8D4C7', '#FFFFFF', '#A78BFA', '#FDE68A'];

interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    rotation: number;
    velocityX: number;
    velocityY: number;
}

const KonamiEasterEgg: React.FC = () => {
    const [, setSequence] = useState<string[]>([]);
    const [triggered, setTriggered] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    const createConfetti = useCallback(() => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 80; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * window.innerWidth,
                y: -20 - Math.random() * 100,
                color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                size: 4 + Math.random() * 8,
                rotation: Math.random() * 360,
                velocityX: (Math.random() - 0.5) * 8,
                velocityY: 3 + Math.random() * 5,
            });
        }
        setParticles(newParticles);
        setTimeout(() => setParticles([]), 4000);
        setTimeout(() => setTriggered(false), 5000);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setSequence(prev => {
                const next = [...prev, e.key].slice(-KONAMI.length);
                if (next.length === KONAMI.length && next.every((k, i) => k === KONAMI[i])) {
                    setTriggered(true);
                    createConfetti();
                    return [];
                }
                return next;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [createConfetti]);

    return (
        <>
            {/* Confetti */}
            <div className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-sm"
                        style={{
                            width: p.size,
                            height: p.size * 0.6,
                            backgroundColor: p.color,
                            left: p.x,
                        }}
                        initial={{ y: p.y, rotate: p.rotation, opacity: 1 }}
                        animate={{
                            y: window.innerHeight + 50,
                            x: p.velocityX * 50,
                            rotate: p.rotation + 720,
                            opacity: [1, 1, 0],
                        }}
                        transition={{ duration: 3 + Math.random() * 2, ease: 'easeOut' }}
                    />
                ))}
            </div>

            {/* Secret message */}
            <AnimatePresence>
                {triggered && (
                    <motion.div
                        className="fixed top-1/2 left-1/2 z-[9997] pointer-events-none"
                        initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                        exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <div className="glass-card px-8 py-6 rounded-2xl text-center">
                            <p className="text-2xl mb-2">🎉</p>
                            <p className="text-sm font-display font-bold text-text-primary">You found the secret!</p>
                            <p className="text-xs text-text-muted mt-1">↑↑↓↓←→←→ — You're clearly a person of culture.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default KonamiEasterEgg;
