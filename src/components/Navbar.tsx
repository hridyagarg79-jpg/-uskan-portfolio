import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsScrolled(latest > 80);

        // Hide on scroll down, show on scroll up
        if (latest < 100) {
            setIsVisible(true);
        } else if (latest > lastScrollY.current && latest - lastScrollY.current > 5) {
            setIsVisible(false);
        } else if (lastScrollY.current - latest > 5) {
            setIsVisible(true);
        }
        lastScrollY.current = latest;
    });

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!isHome) return;
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[60] px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between cursor-none"
            style={{
                backgroundColor: isScrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(24px) saturate(150%)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(196,181,253,0.05)' : '1px solid transparent',
                transition: 'background-color 0.5s, backdrop-filter 0.5s, border-bottom 0.5s',
            }}
        >
            <Link
                to="/"
                className="font-display font-bold text-lg text-text-primary tracking-tight cursor-none hover:text-accent transition-colors duration-500"
            >
                MG.
            </Link>

            <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                    <a
                        key={link.label}
                        href={isHome ? link.href : `/${link.href}`}
                        onClick={(e) => handleClick(e, link.href)}
                        className="text-[11px] font-sans font-medium uppercase tracking-[0.15em] text-text-secondary hover:text-accent transition-colors duration-300 cursor-none hidden md:block animated-underline"
                    >
                        {link.label}
                    </a>
                ))}
                <a
                    href="/muskan_resume.pdf"
                    download
                    className="text-[11px] font-sans font-medium uppercase tracking-[0.15em] px-5 py-2 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-all duration-500 cursor-none"
                >
                    Resume
                </a>
            </div>
        </motion.nav>
    );
};

export default Navbar;
