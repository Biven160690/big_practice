'use client';

import React from 'react';

import { useScrollApi } from '../hooks/useScrollApi';

import { Scroll } from '../scroll';

import styles from './styles.module.scss';

export const VerticalScroll = () => {
    const { scrollAreaRef, updateScrollPosition } = useScrollApi();

    React.useEffect(() => {
        const scrollArea = scrollAreaRef.current;

        if (!scrollArea) {
            return;
        }

        const handleScroll = () => {
            if (scrollArea.scrollTop > 500) {
                updateScrollPosition({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        };

        scrollArea.addEventListener('scroll', handleScroll);

        return () => scrollArea.removeEventListener('scroll', handleScroll);
    }, [scrollAreaRef, updateScrollPosition]);

    return (
        <div className={styles.verticalScroll}>
            <Scroll.Vertical scrollAreaRef={scrollAreaRef}>
                <div className={styles.verticalScroll__block}>
                    {new Array(10).fill(0).map((_, index) => (
                        <div
                            key={index}
                            className={styles.verticalScroll__card}
                        />
                    ))}
                </div>
            </Scroll.Vertical>
        </div>
    );
};
