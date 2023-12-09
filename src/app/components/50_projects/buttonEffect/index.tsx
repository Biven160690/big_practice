'use client';

import React from 'react';
import styles from './styles.module.scss';

// different approach:
// you can use setTimeout(() => circle.remove(), 500) 
// the first - you should add classes of animation when event of click was happened 
// the second - you should remove classes of animation, but you set duration inside setTimeout equals duration of animation

export const ButtonEffect = () => {
    const circleRef = React.useRef<HTMLDivElement | null>(null);
    const buttonRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
        const circle = circleRef.current;
        const button = buttonRef.current;

        if (!(circle && button)) {
            return;
        }

        const { top, left } = button.getBoundingClientRect();
        const { width, height } = circle.getBoundingClientRect();

        const handleClick = (event: MouseEvent) => {
            const { clientX, clientY } = event;

            circle.style.top = `${clientY - top - height / 2}px`;
            circle.style.left = `${clientX - left - width / 2}px`;
            circle.classList.toggle(styles.circle__show);
        };

        const handleAnimationend = () => {
            circle.classList.toggle(styles.circle__show);
        };

        button.addEventListener('click', handleClick);
        circle.addEventListener('animationend', handleAnimationend);

        return () => {
            circle.removeEventListener('animationend', handleAnimationend);
            button.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div ref={buttonRef} className={styles.button}>
            <p>Click Me</p>
            <div ref={circleRef} className={styles.circle} />
        </div>
    );
};
