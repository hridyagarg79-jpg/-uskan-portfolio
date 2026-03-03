import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import type { ProjectData } from '../data/projects';
import RevealOnScroll from './RevealOnScroll';
import SkeletonImage from './SkeletonImage';
import TextScramble from './TextScramble';

const projectMeta: Record<string, { industry: string; impact: string; metric?: string }> = {
    'dots-brand-system': {
        industry: 'Social Platform · Branding',
        impact: 'End-to-end brand system from visual identity to billboards to premium stationery.',
        metric: '2nd / 280+ teams',
    },
    'scarface-poster': {
        industry: 'Poster Design · Visual Art',
        impact: 'Reinterpreted a cultural icon through contemporary duotone design.',
        metric: 'Gallery-quality print',
    },
};

const ProjectCard: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
    const meta = projectMeta[project.slug] || { industry: project.category, impact: project.description };
    const isEven = index % 2 === 0;

    return (
        <RevealOnScroll delay={index * 0.1}>
            <Link to={`/project/${project.slug}`} className="block group cursor-none" data-cursor-text="View">
                <motion.div
                    whileHover={{ rotateY: isEven ? 2 : -2, rotateX: -1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    style={{ transformPerspective: 1200 }}
                    className="relative rounded-2xl overflow-hidden bg-bg-card border border-border hover:border-accent/30 transition-all duration-700 glow-accent-hover"
                >
                    {/* Image with hover zoom */}
                    <div className="w-full aspect-[16/9] overflow-hidden relative">
                        <SkeletonImage
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full group-hover:scale-[1.06] transition-transform duration-[1.5s] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent opacity-60" />

                        {/* Floating metric badge */}
                        {meta.metric && (
                            <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-accent/10 backdrop-blur-md border border-accent/15">
                                <span className="text-[9px] font-sans font-medium text-accent tracking-wider uppercase">
                                    {meta.metric}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-7 md:p-9">
                        <span className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-accent/60 block mb-3">
                            {meta.industry}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight mb-3 leading-tight chromatic-hover">
                            {project.title}
                        </h3>
                        <p className="text-sm font-sans font-light text-text-secondary leading-relaxed">
                            {meta.impact}
                        </p>
                    </div>
                </motion.div>
            </Link>
        </RevealOnScroll>
    );
};

const Work: React.FC = () => {
    return (
        <section className="py-28 md:py-40 max-w-6xl mx-auto px-6 md:px-16 relative">
            {/* Oversized background text */}
            <div className="absolute top-20 left-0 right-0 pointer-events-none select-none overflow-hidden">
                <span className="text-[20vw] font-display font-bold text-text-primary/[0.015] leading-none tracking-tighter whitespace-nowrap block">
                    WORK
                </span>
            </div>

            <RevealOnScroll>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-accent block mb-4">
                    Proof of Work
                </span>
                <TextScramble
                    text="Selected Experiments"
                    as="h2"
                    className="text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight mb-4"
                />
                <p className="text-base font-sans text-text-secondary max-w-lg mb-16">
                    Strategic design with measurable outcomes — not just pretty screens.
                </p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Work;
