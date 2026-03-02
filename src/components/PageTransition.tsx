import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>

            {/* Curtain */}
            <motion.div
                className="fixed inset-0 z-[200] bg-bg origin-bottom pointer-events-none"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Accent sweep — violet */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] z-[201] pointer-events-none"
                style={{ background: 'linear-gradient(90deg, #C4B5FD, #F0C6D4)' }}
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: [0, 1, 1, 0], transformOrigin: ['left', 'left', 'right', 'right'] }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], times: [0, 0.4, 0.6, 1] }}
            />
        </>
    );
};

export default PageTransition;
