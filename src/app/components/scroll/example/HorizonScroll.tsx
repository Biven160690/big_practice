'use client';

import React from 'react';

import { useScrollApi } from '../hooks/useScrollApi';

import { Scroll } from '../scroll';

import styles from './styles.module.scss';
import { getScrollPosition } from '../helper';

const cardWidth = 119;

export const HorizonScroll = () => {
    const { scrollAreaRef, containerRef, updateScrollPosition } =
        useScrollApi();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const container = containerRef.current;
        const scrollArea = scrollAreaRef.current;

        if (!container || !scrollArea) {
            return;
        }

        updateScrollPosition({
            left: getScrollPosition(
                container,
                scrollArea,
                cardWidth,
                Number(e.target.value)
            ),
            behavior: 'smooth',
        });
    };

    return (
        <div className={styles.horizonScroll}>
            <select onChange={handleChange} defaultValue="1">
                {new Array(17).fill(0).map((_, index) => (
                    <option key={index} value={index + 1}>
                        {index + 1}
                    </option>
                ))}
            </select>

            <div className={styles.horizonScroll__body}>
                <Scroll.Horizon
                    scrollAreaRef={scrollAreaRef}
                    containerRef={containerRef}
                    isDragged
                >
                    <div className={styles.horizonScroll__block}>
                        {new Array(17).fill(0).map((_, index) => (
                            <div
                                key={index}
                                className={styles.horizonScroll__card}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </Scroll.Horizon>
            </div>
        </div>
    );
};
