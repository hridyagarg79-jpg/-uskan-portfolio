import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SkeletonImageProps {
    src: string;
    alt: string;
    className?: string;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({ src, alt, className = '' }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!loaded && !error && (
                <div className="absolute inset-0 bg-bg-card">
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,126,0.04) 50%, transparent 100%)',
                        }}
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            )}

            {error && (
                <div className="absolute inset-0 bg-bg-card flex items-center justify-center">
                    <span className="text-text-muted text-xs font-sans uppercase tracking-wider">Image unavailable</span>
                </div>
            )}

            <motion.img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full h-full object-cover ${loaded ? '' : 'invisible'}`}
            />
        </div>
    );
};

export default SkeletonImage;
