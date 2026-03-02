import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            >
                <span className="text-[35vw] font-display font-bold text-text-primary/[0.02] leading-none tracking-tighter">
                    404
                </span>
            </motion.div>

            <div className="relative z-10 text-center max-w-lg px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-accent block mb-6">
                        Page Not Found
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary tracking-tight mb-6 leading-none chromatic-hover">
                        Lost in space.
                    </h1>
                    <p className="text-base font-sans font-light text-text-secondary leading-relaxed mb-10 max-w-sm mx-auto">
                        This page doesn't exist — but my work does. Let me take you back.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <Link
                        to="/"
                        className="inline-block px-8 py-4 rounded-full bg-accent text-bg font-sans font-medium text-sm uppercase tracking-[0.15em] cursor-none hover:shadow-[0_0_35px_-5px_rgba(196,181,253,0.3)] transition-all duration-500"
                    >
                        Back to Portfolio
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
