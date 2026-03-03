import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BackToTop: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [0, 0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.15, 0.2], [0.5, 0.5, 1]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Magnetic effect
    const [pos, setPos] = React.useState({ x: 0, y: 0 });
    const ref = React.useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setPos({
            x: (e.clientX - cx) * 0.25,
            y: (e.clientY - cy) * 0.25,
        });
    };

    const handleMouseLeave = () => setPos({ x: 0, y: 0 });

    return (
        <motion.button
            ref={ref}
            onClick={scrollToTop}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center cursor-none hover:border-accent/30 transition-colors duration-300"
            style={{
                opacity,
                scale,
                x: pos.x,
                y: pos.y,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-primary">
                <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </motion.button>
    );
};

export default BackToTop;
