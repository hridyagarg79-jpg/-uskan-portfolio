import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
    quote: string;
    name: string;
    role: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Her design sensibility is rare — she balances aesthetics with function effortlessly. Strategic thinking well beyond expectations.",
        name: "Design Fusion S3",
        role: "Hackathon Jury Panel"
    },
    {
        quote: "She doesn't just make things look good — she thinks through every interaction, every edge case, every user emotion.",
        name: "Chitkara Design School",
        role: "Faculty Review"
    },
    {
        quote: "Working with Muskan felt like a creative partnership. She pushed the visual language further and delivered something we didn't know we needed.",
        name: "Peer Collaborator",
        role: "Design Hackathon"
    },
];

const Testimonials: React.FC = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setActive(prev => (prev + 1) % testimonials.length), 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-28 md:py-40 max-w-4xl mx-auto px-6 md:px-16">
            <div className="section-divider mb-28" />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-accent">
                    Kind Words
                </span>
            </motion.div>

            <div className="relative min-h-[200px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                    >
                        <blockquote className="text-xl md:text-2xl font-serif italic text-text-primary leading-relaxed mb-8 max-w-2xl mx-auto">
                            "{testimonials[active].quote}"
                        </blockquote>
                        <p className="font-display font-bold text-sm text-text-primary tracking-wide">
                            {testimonials[active].name}
                        </p>
                        <p className="font-sans font-light text-xs text-text-muted uppercase tracking-[0.2em] mt-1">
                            {testimonials[active].role}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-3 mt-10">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`h-1 rounded-full transition-all duration-500 cursor-none ${i === active ? 'w-8 bg-accent' : 'w-2 bg-border-hover'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
