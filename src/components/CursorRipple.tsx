import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
    id: number;
    x: number;
    y: number;
}

const CursorRipple: React.FC = () => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = useCallback((e: MouseEvent) => {
        const newRipple: Ripple = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
        };
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 800);
    }, []);

    React.useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [handleClick]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9996]">
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.div
                        key={ripple.id}
                        className="absolute rounded-full border border-accent/40"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                        initial={{ width: 0, height: 0, opacity: 0.6 }}
                        animate={{ width: 60, height: 60, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CursorRipple;
