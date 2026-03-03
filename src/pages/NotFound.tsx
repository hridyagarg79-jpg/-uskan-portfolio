import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const emojis = ['😵‍💫', '🫠', '🤷‍♀️', '👻', '💀', '🫣', '😅', '🌀'];

const EmojiRain: React.FC = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        emoji: emojis[i % emojis.length],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        size: 16 + Math.random() * 16,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    style={{ left: `${p.left}%`, fontSize: p.size, opacity: 0.25 }}
                    initial={{ y: -50, rotate: 0 }}
                    animate={{ y: '110vh', rotate: 360 }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {p.emoji}
                </motion.div>
            ))}
        </div>
    );
};

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden">
            <EmojiRain />
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-[20vw] md:text-[15vw] font-display font-bold text-text-primary/[0.07] leading-none tracking-tighter select-none">
                        404
                    </h1>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight chromatic-hover -mt-16 md:-mt-24 relative z-10">
                        Page Not Found
                    </h2>
                    <p className="text-base font-sans text-text-secondary mt-6 mb-10 max-w-md mx-auto">
                        This page got lost in the design system. Let's get you back.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                >
                    <Link
                        to="/"
                        className="inline-block px-8 py-4 rounded-full bg-accent text-bg font-sans font-semibold text-sm uppercase tracking-[0.15em] cursor-none hover:shadow-[0_0_35px_-5px_rgba(196,181,253,0.3)] transition-all duration-500"
                    >
                        Back to Portfolio
                    </Link>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-xs text-text-muted mt-12"
                >
                    Protip: the emojis are free entertainment 😵‍💫
                </motion.p>
            </div>
        </div>
    );
};

export default NotFound;
