import React from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[90] origin-left"
            style={{
                scaleX: scrollYProgress,
                background: 'linear-gradient(90deg, #C4B5FD, #F0C6D4, #B8D4C7)',
            }}
        />
    );
};

export default ScrollProgress;
