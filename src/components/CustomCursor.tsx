import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const trailCount = 4;

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
    const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });

    // Trail springs (progressively slower)
    const trails = Array.from({ length: trailCount }, (_, i) => ({
        x: useSpring(cursorX, { stiffness: 200 - i * 40, damping: 30 + i * 5 }),
        y: useSpring(cursorY, { stiffness: 200 - i * 40, damping: 30 + i * 5 }),
    }));

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleEnter = () => setIsVisible(true);
        const handleLeave = () => setIsVisible(false);

        const handleHoverStart = (e: Event) => {
            setIsHovering(true);
            const el = e.currentTarget as HTMLElement;
            setHoverText(el.dataset.cursorText || '');
        };
        const handleHoverEnd = () => {
            setIsHovering(false);
            setHoverText('');
        };

        window.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseenter', handleEnter);
        document.addEventListener('mouseleave', handleLeave);

        const observe = () => {
            const els = document.querySelectorAll('a, button, [role="button"], [data-cursor-text]');
            els.forEach(el => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
            return els;
        };

        const els = observe();
        const observer = new MutationObserver(() => observe());
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseenter', handleEnter);
            document.removeEventListener('mouseleave', handleLeave);
            els.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
            observer.disconnect();
        };
    }, [cursorX, cursorY, isVisible]);

    if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

    return (
        <>
            {/* Trail dots */}
            {trails.map((trail, i) => (
                <motion.div
                    key={i}
                    className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-accent"
                    style={{
                        x: trail.x,
                        y: trail.y,
                        translateX: '-50%',
                        translateY: '-50%',
                        width: 4 - i * 0.5,
                        height: 4 - i * 0.5,
                        opacity: isVisible ? 0.15 - i * 0.03 : 0,
                    }}
                />
            ))}

            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 64 : 8,
                        height: isHovering ? 64 : 8,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="rounded-full flex items-center justify-center"
                    style={{
                        backgroundColor: isHovering ? 'rgba(196, 181, 253, 0.08)' : 'rgba(240, 237, 232, 1)',
                        border: isHovering ? '1px solid rgba(196, 181, 253, 0.3)' : 'none',
                        backdropFilter: isHovering ? 'blur(8px)' : 'none',
                    }}
                >
                    {isHovering && hoverText && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[8px] font-sans font-medium uppercase tracking-[0.15em] text-accent whitespace-nowrap"
                        >
                            {hoverText}
                        </motion.span>
                    )}
                </motion.div>
            </motion.div>
        </>
    );
};

export default CustomCursor;
