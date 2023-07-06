'use client';

import React, { WheelEvent } from 'react';

import { useScrollApi } from '../hooks/useScrollApi';

import { Carousel } from '../carousel';

import styles from './styles.module.scss';

const cardWidth = 119;

export const DefaultCarousel = () => {
    const { scrollAreaRef, containerRef, updateScrollPosition } =
        useScrollApi();

    const handleDirectionPrev = () => {
        const scrollArea = scrollAreaRef.current;

        if (!scrollArea || scrollArea.scrollLeft === 0) {
            return;
        }

        updateScrollPosition({
            left: scrollArea.scrollLeft - cardWidth,
            behavior: 'smooth',
        });
    };

    const handleDirectionNext = () => {
        const scrollArea = scrollAreaRef.current;
        const container = containerRef.current;

        if (!scrollArea || !container) {
            return;
        }

        const { scrollLeft, scrollWidth } = scrollArea;
        const { clientWidth } = container;

        if (scrollLeft === scrollWidth - clientWidth) {
            return;
        }

        updateScrollPosition({
            left: scrollLeft + cardWidth,
            behavior: 'smooth',
        });
    };

    const onMouseWheel = (e: WheelEvent<HTMLDivElement>) => {
        e.deltaY < 0 ? handleDirectionNext() : handleDirectionPrev();
    };

    return (
        <div className={styles.defaultCarousel}>
            <button
                onClick={handleDirectionPrev}
                className={styles.defaultCarousel__button_left}
            >
                &lt;
            </button>
            <div className={styles.defaultCarousel__body}>
                <Carousel.Default
                    scrollAreaRef={scrollAreaRef}
                    containerRef={containerRef}
                    onMouseWheel={onMouseWheel}
                    isDragged
                >
                    <div className={styles.defaultCarousel__block}>
                        {new Array(17).fill(0).map((_, index) => (
                            <div
                                key={index}
                                className={styles.defaultCarousel__card}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </Carousel.Default>
            </div>
            <button
                onClick={handleDirectionNext}
                className={styles.defaultCarousel__button_right}
            >
                &gt;
            </button>
        </div>
    );
};
