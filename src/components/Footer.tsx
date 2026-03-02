import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Footer: React.FC = () => {
    return (
        <footer id="contact" className="py-28 md:py-40 relative">
            <div className="section-divider" />

            <div className="max-w-5xl mx-auto px-6 md:px-16 pt-28 text-center relative">
                {/* Oversized background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                    <span className="text-[20vw] font-display font-bold text-text-primary/[0.015] leading-none tracking-tighter">
                        LET'S GO
                    </span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-accent block mb-6">
                        Start a Conversation
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary tracking-tight leading-[1.05] mb-4">
                        Let's build something
                    </h2>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05] mb-10 text-gradient-violet">
                        remarkable.
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="relative z-10"
                >
                    <MagneticButton href="mailto:muskan2047.cds@chitkara.edu.in">
                        <span className="inline-block px-10 py-5 rounded-full bg-accent text-bg font-sans font-medium text-sm uppercase tracking-[0.15em] hover:shadow-[0_0_40px_-5px_rgba(196,181,253,0.3)] transition-all duration-500">
                            Start a Project
                        </span>
                    </MagneticButton>
                </motion.div>

                {/* Playful line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-xs font-sans font-light text-text-muted mt-12 mb-16"
                >
                    If you've scrolled this far, we should probably talk.
                </motion.p>

                {/* Social */}
                <div className="flex items-center justify-center gap-10 mb-20">
                    {[
                        { label: 'Behance', href: 'https://behance.net/muskangarg02' },
                        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muskangarg02/' },
                        { label: 'Resume', href: '/muskan_resume.pdf' },
                    ].map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                            className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-text-muted hover:text-accent animated-underline transition-colors duration-300 cursor-none">
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="section-divider mb-8" />
                <p className="text-[10px] font-sans text-text-muted tracking-[0.3em] uppercase">
                    &copy; {new Date().getFullYear()} Muskan Garg — designed with intention ✦
                </p>
            </div>
        </footer>
    );
};

export default Footer;
