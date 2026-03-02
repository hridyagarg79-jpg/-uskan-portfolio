import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { getProjectBySlug, getNextProject } from '../data/projects';
import SkeletonImage from '../components/SkeletonImage';

/* ═══ ANIMATED COUNTER ═══ */
const Counter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const num = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * num));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, num]);

    return (
        <div ref={ref} className="text-center">
            <span className="text-4xl md:text-6xl font-serif font-light text-text-primary">
                {display}{suffix}
            </span>
            <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-text-muted mt-3">{label}</p>
        </div>
    );
};

/* ═══ SCROLL REVEAL TEXT ═══ */
const ScrollRevealText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.4"] });
    const words = text.split(' ');

    return (
        <p ref={ref} className={className}>
            {words.map((word, i) => (
                <Word key={i} progress={scrollYProgress} index={i} total={words.length}>{word}</Word>
            ))}
        </p>
    );
};

const Word: React.FC<{ children: string; progress: any; index: number; total: number }> = ({ children, progress, index, total }) => {
    const start = index / total;
    const end = (index + 1) / total;
    const opacity = useTransform(progress, [start, end], [0.15, 1]);
    const y = useTransform(progress, [start, end], [5, 0]);
    return (
        <motion.span style={{ opacity, y }} className="inline-block mr-[0.35em] will-change-transform">
            {children}
        </motion.span>
    );
};

/* ═══ PARALLAX IMAGE ═══ */
const ParallaxImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.1]);

    return (
        <div ref={ref} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden my-8">
            <motion.div style={{ y, scale }} className="absolute inset-0">
                <SkeletonImage src={src} alt={alt} className="w-full h-full" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg/40" />
        </div>
    );
};

/* ═══ HORIZONTAL GALLERY ═══ */
const HorizontalGallery: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

    return (
        <div ref={containerRef} className="overflow-hidden py-8">
            <motion.div style={{ x }} className="flex gap-6 will-change-transform">
                {images.map((src, i) => (
                    <div key={i} className="flex-shrink-0 w-[60vw] md:w-[40vw] rounded-2xl overflow-hidden bg-bg-card border border-border">
                        <SkeletonImage src={src} alt={`${title} ${i + 1}`} className="w-full aspect-video" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

/* ═══ SECTION LABEL ═══ */
const SectionLabel: React.FC<{ text: string; number: string }> = ({ text, number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-10"
    >
        <span className="text-4xl font-serif font-light text-accent/20">{number}</span>
        <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-accent">{text}</span>
    </motion.div>
);

/* ═══════════════════════════════════════
   PROJECT PAGE — CINEMATIC SCROLL
   ═══════════════════════════════════════ */
const ProjectPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const project = slug ? getProjectBySlug(slug) : undefined;

    const heroRef = useRef(null);
    const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
    const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

    useEffect(() => { window.scrollTo(0, 0); }, [slug]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="text-center">
                    <h1 className="text-4xl font-serif font-medium text-text-primary mb-4">Project not found</h1>
                    <button onClick={() => navigate('/')} className="text-accent text-sm font-sans uppercase tracking-[0.15em] cursor-none">← Back</button>
                </div>
            </div>
        );
    }

    const next = getNextProject(project.slug);

    return (
        <div className="bg-bg min-h-screen">

            {/* Back button */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="fixed top-8 left-8 z-50 mix-blend-difference">
                <Link to="/" className="flex items-center gap-3 text-[11px] font-sans font-medium uppercase tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors cursor-none">
                    <span className="w-8 h-px bg-text-muted" /> Back
                </Link>
            </motion.div>

            {/* 1. HERO */}
            <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
                <motion.div style={{ scale: heroScale }} className="absolute inset-0">
                    <SkeletonImage src={project.image} alt={project.title} className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/20" />
                </motion.div>
                <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16 pb-20">
                    <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-accent block mb-5">
                        {project.category}
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-text-primary leading-[0.95] mb-6">
                        {project.title}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
                        className="text-base md:text-lg font-sans font-light text-text-secondary max-w-xl">
                        {project.tagline}
                    </motion.p>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
                        className="mt-12">
                        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
                            className="w-[1px] h-10 bg-gradient-to-b from-accent/40 to-transparent" />
                    </motion.div>
                </motion.div>
            </section>

            {/* 2. OVERVIEW */}
            <section className="max-w-5xl mx-auto px-8 md:px-16 py-28 md:py-40">
                <SectionLabel text="Overview" number="01" />
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="flex-1">
                        <ScrollRevealText text={project.overview}
                            className="text-xl md:text-2xl font-sans font-light text-text-primary leading-relaxed tracking-tight" />
                    </div>
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.3 }} className="md:w-56 flex flex-col gap-8 md:border-l md:border-border md:pl-10">
                        <div>
                            <p className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-text-muted mb-2">Role</p>
                            <p className="text-sm font-sans font-medium text-text-primary">{project.role}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-text-muted mb-2">Timeline</p>
                            <p className="text-sm font-sans font-medium text-text-primary">{project.timeline}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-text-muted mb-2">Tools</p>
                            <div className="flex flex-wrap gap-1.5">
                                {project.tools.map((t, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-full text-[10px] font-sans tracking-wider bg-accent-dim text-accent/70 border border-accent/10">{t}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. CORE PROBLEM */}
            <section className="min-h-[80vh] flex items-center justify-center px-8 md:px-16 py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <SectionLabel text="The Challenge" number="02" />
                    <ScrollRevealText text={project.coreProblem}
                        className="text-2xl md:text-4xl font-serif font-light text-text-primary leading-snug italic" />
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-sm font-sans font-light text-text-secondary leading-relaxed mt-12 max-w-2xl mx-auto">
                        {project.coreProblemDetail}
                    </motion.p>
                </div>
            </section>

            {/* 4. PARALLAX IMAGE */}
            {project.screens[0] && <ParallaxImage src={project.screens[0]} alt={project.title} />}

            {/* 5. PERSONAS */}
            <section className="max-w-5xl mx-auto px-8 md:px-16 py-28 md:py-40">
                <SectionLabel text="Who We Designed For" number="03" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.personas.map((persona, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.7 }}
                            className="glass-card rounded-2xl p-8 md:p-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-accent-dim flex items-center justify-center text-lg font-serif font-medium text-accent">
                                    {persona.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-base font-sans font-medium text-text-primary">{persona.name}</h3>
                                    <p className="text-xs font-sans text-text-muted">{persona.age} · {persona.occupation}</p>
                                </div>
                            </div>
                            <p className="text-base font-serif italic text-accent/60 leading-relaxed mb-6 border-l border-accent/20 pl-5">
                                {persona.quote}
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-accent/60 mb-3">Goals</p>
                                    {persona.goals.map((g, j) => (
                                        <div key={j} className="flex items-start gap-2 mb-2.5">
                                            <span className="w-1 h-1 rounded-full bg-accent/40 mt-1.5 flex-shrink-0" />
                                            <span className="text-sm font-sans text-text-secondary leading-relaxed">{g}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-text-muted mb-3">Pain Points</p>
                                    {persona.painPoints.map((p, j) => (
                                        <div key={j} className="flex items-start gap-2 mb-2.5">
                                            <span className="w-1 h-1 rounded-full bg-text-muted mt-1.5 flex-shrink-0" />
                                            <span className="text-sm font-sans text-text-secondary leading-relaxed">{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 6. JOURNEY */}
            <section className="max-w-4xl mx-auto px-8 md:px-16 py-28 md:py-40">
                <SectionLabel text="The Journey" number="04" />
                <div className="relative">
                    <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent/20 via-accent/8 to-transparent" />
                    {project.journey.map((stage, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.1, duration: 0.6 }}
                            className="flex items-start gap-8 mb-10 last:mb-0 relative">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-dim border border-accent/15 flex items-center justify-center text-xs font-sans font-medium text-accent relative z-10">
                                {i + 1}
                            </div>
                            <div className="flex-1 pb-2">
                                <h3 className="text-base font-sans font-medium text-text-primary mb-1">{stage.stage}</h3>
                                <p className="text-sm font-sans text-text-secondary mb-2 leading-relaxed">{stage.action}</p>
                                <p className="text-sm font-serif italic text-text-muted">{stage.thought}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 7. STORYBOARD */}
            <section className="max-w-5xl mx-auto px-8 md:px-16 py-28 md:py-40">
                <SectionLabel text="The Story" number="05" />
                <div className="space-y-10">
                    {project.storyboard.map((panel, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.7 }}
                            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10`}>
                            <div className="md:w-24 flex-shrink-0 text-center">
                                <span className="text-6xl font-serif font-light text-accent/[0.08]">{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="flex-1 glass-card rounded-2xl p-8">
                                <h3 className="text-lg font-serif font-medium text-text-primary mb-3">{panel.scene}</h3>
                                <p className="text-sm font-sans font-light text-text-secondary leading-relaxed">{panel.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 8. FLASH CARDS */}
            <section className="max-w-5xl mx-auto px-8 md:px-16 py-28 md:py-40">
                <SectionLabel text="Design Decisions" number="06" />
                <p className="text-sm font-sans text-text-muted mb-12">Hover to reveal</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.flashCards.map((card, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                            className="flip-card h-48 cursor-pointer">
                            <div className="flip-card-inner relative w-full h-full">
                                <div className="flip-card-front absolute inset-0 bg-bg-card rounded-2xl p-7 flex items-center justify-center border border-border"
                                    style={{ borderTop: '2px solid var(--color-accent)' }}>
                                    <p className="text-base font-serif font-medium text-text-primary text-center">{card.front}</p>
                                </div>
                                <div className="flip-card-back absolute inset-0 rounded-2xl p-7 flex items-center justify-center bg-accent-dim border border-accent/10">
                                    <p className="text-sm font-sans text-text-secondary text-center leading-relaxed">{card.back}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 9. GALLERY */}
            {project.screens.length > 0 && (
                <section className="py-28 md:py-40 overflow-hidden">
                    <div className="max-w-5xl mx-auto px-8 md:px-16 mb-12">
                        <SectionLabel text="Deliverables" number="07" />
                    </div>
                    <HorizontalGallery images={project.screens} title={project.title} />
                </section>
            )}

            {/* 10. PROCESS */}
            <section className="max-w-4xl mx-auto px-8 md:px-16 py-28 md:py-40">
                <SectionLabel text="Process" number="08" />
                <div className="space-y-6">
                    {project.processSteps.map((step, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex items-start gap-6">
                            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-dim border border-accent/10 flex items-center justify-center text-xs font-sans font-medium text-accent/60">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <p className="text-sm font-sans font-light text-text-secondary leading-relaxed pt-2.5">{step}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 11. STATS + INSIGHTS */}
            <section className="min-h-[80vh] flex flex-col items-center justify-center px-8 md:px-16 py-28 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
                <div className="max-w-5xl mx-auto w-full relative z-10">
                    <SectionLabel text="Results" number="09" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                        <Counter value="40+" label="Concepts" />
                        <Counter value="14" label="Touchpoints" />
                        <Counter value="280+" label="Competitors" />
                        <Counter value="7" label="Weeks" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {project.insights.map((insight, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                                <span className="text-5xl font-serif font-light text-accent/15">{insight.number}</span>
                                <h3 className="text-lg font-serif font-medium text-text-primary mt-3 mb-3">{insight.title}</h3>
                                <p className="text-sm font-sans font-light text-text-secondary leading-relaxed">{insight.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 12. NEXT PROJECT */}
            <section className="min-h-[50vh] flex items-center justify-center px-8 border-t border-border">
                <div className="text-center">
                    <p className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-text-muted mb-8">Next</p>
                    <Link to={`/project/${next.slug}`} className="group inline-block cursor-none">
                        <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-text-primary/10 group-hover:text-text-primary transition-all duration-700 leading-none mb-4">
                            {next.title}
                        </h2>
                        <span className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-accent/30 group-hover:text-accent transition-colors">
                            View Case Study →
                        </span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <div className="text-center py-8 border-t border-border">
                <p className="text-[10px] font-sans text-text-muted tracking-[0.3em] uppercase">
                    &copy; {new Date().getFullYear()} Muskan Garg
                </p>
            </div>
        </div>
    );
};

export default ProjectPage;
