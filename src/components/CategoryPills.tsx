import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    { icon: '🎨', label: 'UI/UX Design', color: 'from-accent/20 to-accent/5' },
    { icon: '📱', label: 'Mobile Apps', color: 'from-[#F0C6D4]/20 to-[#F0C6D4]/5' },
    { icon: '🖥️', label: 'Web Design', color: 'from-[#B8D4C7]/20 to-[#B8D4C7]/5' },
    { icon: '⚡', label: 'Prototyping', color: 'from-[#FDE68A]/20 to-[#FDE68A]/5' },
];

const CategoryPills: React.FC = () => {
    return (
        <div className="flex flex-wrap gap-3 mt-10">
            {categories.map((cat, i) => (
                <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 + i * 0.1, duration: 0.6 }}
                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r ${cat.color} backdrop-blur-xl border border-white/[0.06] cursor-none hover:border-accent/20 hover:scale-[1.03] transition-all duration-500`}
                >
                    <span className="text-sm">{cat.icon}</span>
                    <span className="text-[11px] font-sans font-medium text-text-primary tracking-wide">
                        {cat.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export default CategoryPills;
