import React, { useState, useEffect, useCallback } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

interface TextScrambleProps {
    text: string;
    className?: string;
    as?: 'h2' | 'h3' | 'span' | 'p';
}

const TextScramble: React.FC<TextScrambleProps> = ({ text, className = '', as: Tag = 'span' }) => {
    const [displayed, setDisplayed] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    const scramble = useCallback(() => {
        if (isScrambling) return;
        setIsScrambling(true);
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayed(
                text
                    .split('')
                    .map((char, i) => {
                        if (char === ' ') return ' ';
                        if (i < iteration) return text[i];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );
            iteration += 1 / 2;
            if (iteration >= text.length) {
                setDisplayed(text);
                setIsScrambling(false);
                clearInterval(interval);
            }
        }, 30);
    }, [text, isScrambling]);

    useEffect(() => { setDisplayed(text); }, [text]);

    return (
        <Tag
            className={`${className} cursor-none`}
            onMouseEnter={scramble}
        >
            {displayed}
        </Tag>
    );
};

export default TextScramble;
