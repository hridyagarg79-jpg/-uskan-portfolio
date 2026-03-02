import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles: React.FC = () => {
    const particles = useMemo(() =>
        Array.from({ length: 18 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 2 + Math.random() * 3,
            duration: 15 + Math.random() * 20,
            delay: Math.random() * 10,
            opacity: 0.08 + Math.random() * 0.12,
        })), []
    );

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-accent"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [0, -80, -160, -80, 0],
                        x: [0, 20, -10, -20, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;
