'use client';

import React, { WheelEvent } from 'react';

import { useScrollApi } from '../hooks/useScrollApi';

import { Carousel } from '../carousel';

import styles from './styles.module.scss';
import { useOnScreen } from '@/app/snippents/hooks/useObserver';

const cardWidth = 119;

export type CardRefList = React.MutableRefObject<{
    [key: number]: HTMLDivElement;
}>;

export type InputsCollection<T> = {
    [key: number]: T;
};

export const DefaultCarousel = () => {
    const { scrollAreaRef, containerRef, updateScrollPosition } =
        useScrollApi();

    const cardRef = React.useRef<InputsCollection<HTMLDivElement>>({});
    const bodyRef = React.useRef<HTMLDivElement | null>(null);

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
    const { runObserver } = useOnScreen();

    React.useEffect(() => {
        const body = bodyRef.current;
        const card = cardRef.current;

        if (!(body && card)) {
            return;
        }
        const callback = () => {
            alert('it works');
        };

        runObserver(
            { rootMargin: '0px', threshold: 0.5 },
            body,
            callback
        );
    }, [runObserver]);

    const onMouseWheel = (e: WheelEvent<HTMLDivElement>) => {
        e.deltaY < 0 ? handleDirectionNext() : handleDirectionPrev();
    };

    return (
        <div className={styles.defaultCarousel} ref={bodyRef}>
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
                                ref={(link) => {
                                    if (!link) {
                                        return;
                                    }
                                    cardRef.current[index] = link;
                                }}
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
