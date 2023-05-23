'use client';

import React from 'react';
import styles from './styles.module.scss';

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
    const runnerRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const completedLineRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const runner = runnerRef.current;
        const container = containerRef.current;
        const completedLine = completedLineRef.current;

        if (!(runner && container && completedLine)) {
            return;
        }

        const handleMouseUp = () => {
            document.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mousemove', handleMouseMove);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const containerWidth = container.clientWidth;
            const runnerWidth = runner.clientWidth;

            const progress = getRunnerPosition(
                e.clientX - container.getBoundingClientRect().left,
                containerWidth - runnerWidth
            );

            runner.style.transform = `translateX(${progress}px)`;
            completedLine.style.transform = `scaleX(${
                (progress + runnerWidth) / (containerWidth / 100) / 100
            })`;
        };

        const handleMouseDown = (e: MouseEvent) => {
            document.addEventListener('mouseup', handleMouseUp);
            container.addEventListener('mousemove', handleMouseMove);
        };

        runner.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mousemove', handleMouseMove);
            runner.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    return (
        <div className={styles.progressBar}>
            <div
                className={styles.container}
                ref={containerRef}
                data-testid="container"
            >
                <div className={styles.progressLineContainer}>
                    <div className={styles.defaultLine} />
                    <div
                        className={styles.completedLine}
                        ref={completedLineRef}
                        data-testid="completed-line"
                    />
                </div>
                <div
                    className={styles.runner}
                    ref={runnerRef}
                    data-testid="runner"
                />
            </div>
        </div>
    );
};
