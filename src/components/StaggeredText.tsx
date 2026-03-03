import React from 'react';
import { motion } from 'framer-motion';

interface StaggeredTextProps {
    text: string;
    className?: string;
    as?: 'h2' | 'h3' | 'span' | 'p';
    delay?: number;
}

const StaggeredText: React.FC<StaggeredTextProps> = ({ text, className = '', as: Tag = 'h2', delay = 0 }) => {
    const words = text.split(' ');

    return (
        <Tag className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                    <motion.span
                        className="inline-block"
                        initial={{ y: '100%', opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
};

export default StaggeredText;
