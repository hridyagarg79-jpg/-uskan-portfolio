import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollHueShift: React.FC = () => {
    const { scrollYProgress } = useScroll();

    // Shift through: charcoal → deep navy → dark purple → dark teal → charcoal
    const bg1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0.6, 0, 0, 0]);
    const bg2Opacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0.5, 0, 0]);
    const bg3Opacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0, 0.4, 0]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Deep navy phase */}
            <motion.div
                className="absolute inset-0"
                style={{
                    opacity: bg1Opacity,
                    background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(15, 23, 42, 0.6) 0%, transparent 70%)',
                }}
            />
            {/* Dark purple phase */}
            <motion.div
                className="absolute inset-0"
                style={{
                    opacity: bg2Opacity,
                    background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(30, 15, 45, 0.5) 0%, transparent 70%)',
                }}
            />
            {/* Dark teal phase */}
            <motion.div
                className="absolute inset-0"
                style={{
                    opacity: bg3Opacity,
                    background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(15, 35, 35, 0.4) 0%, transparent 70%)',
                }}
            />
        </div>
    );
};

export default ScrollHueShift;
