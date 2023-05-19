'use client';

import React from 'react';
import styles from './progressBsr.module.scss';

const getRunnerPosition = (clientX: number, contentWidth: number) => {
    if (clientX <= 0) {
        return 0;
    }

    if (clientX >= contentWidth) {
        return contentWidth;
    }

    return clientX;
};

export const ProgressBar = () => {
    const runner = React.useRef<HTMLDivElement>(null);
    const container = React.useRef<HTMLDivElement>(null);
    const completedLine = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const runnerRef = runner.current;
        const containerRef = container.current;
        const completedLineRef = completedLine.current;


        if (!(runnerRef && containerRef && completedLineRef)) {
            return;
        }

        const handleMouseUp = () => {
            document.removeEventListener('mouseup', handleMouseUp);
            containerRef.removeEventListener('mousemove', handleMouseMove);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const containerWidth = containerRef.clientWidth;
            const runnerWidth = runnerRef.clientWidth;

            const progress = getRunnerPosition(
                e.clientX - containerRef.getBoundingClientRect().left,
                containerWidth - runnerWidth
            );

            runnerRef.style.transform = `translateX(${progress}px)`;
            completedLineRef.style.transform = `scaleX(${
                (progress + runnerWidth) / (containerWidth / 100) / 100
            })`;
        };

        runnerRef.addEventListener('mousedown', (event) => {
            event.preventDefault();
            document.addEventListener('mouseup', handleMouseUp);
            containerRef.addEventListener('mousemove', handleMouseMove);
        });

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            containerRef.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className={styles.progressBar}>
            <div
                className={styles.container}
                ref={container}
                data-testid="container"
            >
                <div className={styles.progressLineContainer}>
                    <div className={styles.defaultLine} />
                    <div
                        className={styles.completedLine}
                        ref={completedLine}
                        data-testid="completed-line"
                    />
                </div>
                <div
                    className={styles.runner}
                    ref={runner}
                    data-testid="runner"
                />
            </div>
        </div>
    );
};
