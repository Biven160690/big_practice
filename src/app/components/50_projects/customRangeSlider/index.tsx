import React from 'react';

import styles from './styles.module.scss';
import cx from 'classnames';

export type UpdatePositionArgs = {
    baseContainer: HTMLDivElement;
    runner: HTMLDivElement;
    clientX: number;
    element: HTMLElement;
};

export type UpdatePosition = Record<
    RangeElements,
    ({ baseContainer, runner, clientX, element }: UpdatePositionArgs) => void
>;

enum RangeElements {
    rangeCompleted = 'rangeCompleted',
    runnerLabel = 'runnerLabel',
    runner = 'runner',
}

const rangeElements: { [key: number]: RangeElements } = {
    1: RangeElements.rangeCompleted,
    2: RangeElements.runnerLabel,
    3: RangeElements.runner,
};

const checkRunnerPosition = (
    baseContainer: HTMLDivElement,
    runner: HTMLDivElement,
    clientX: number,
    updatePosition: UpdatePosition
) => {
    const { left, right } = baseContainer.getBoundingClientRect();

    if (left > clientX || clientX > right) {
        return;
    }

    baseContainer.childNodes.forEach((element, index) => {
        updatePosition[rangeElements?.[index]]?.({
            baseContainer,
            runner,
            clientX,
            element: element as HTMLElement,
        });
    });
};

const updatePosition: UpdatePosition = {
    [RangeElements.rangeCompleted]: ({
        baseContainer,
        runner,
        clientX,
        element,
    }) => {
        if (element) {
            element.style.transform = `scaleX(${getElementPosition(
                RangeElements.rangeCompleted,
                baseContainer,
                runner,
                clientX
            )})`;
        }
    },

    [RangeElements.runnerLabel]: ({
        baseContainer,
        runner,
        clientX,
        element,
    }) => {
        if (element) {
            const elementPosition = getElementPosition(
                RangeElements.runnerLabel,
                baseContainer,
                runner,
                clientX
            );
            const { width, left } = baseContainer.getBoundingClientRect();
            const progress = Math.floor(((clientX - left) * 100) / width);

            element.style.transform = `translateX(${elementPosition}px)`;
            element.innerHTML = `${progress}`;
        }
    },

    [RangeElements.runner]: ({ baseContainer, runner, clientX, element }) => {
        if (element) {
            element.style.transform = `translateX(${getElementPosition(
                RangeElements.runner,
                baseContainer,
                runner,
                clientX
            )}px)`;
        }
    },
};

const getElementPosition = (
    currentElement: RangeElements,
    baseContainer: HTMLDivElement,
    runner: HTMLDivElement,
    clientX: number
) => {
    const leftIndentContainer = baseContainer.getBoundingClientRect().left;
    const containerWidth = baseContainer.getBoundingClientRect().width;
    const runnerWidth = runner.getBoundingClientRect().width;
    const progress = clientX - leftIndentContainer - runnerWidth / 2;

    if (currentElement !== RangeElements.rangeCompleted) {
        return progress;
    }

    return (progress + runnerWidth) / (containerWidth / 100) / 100;
};

export const CustomRangeSlider = () => {
    const baseContainerRef = React.useRef<HTMLDivElement | null>(null);
    const runnerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const baseContainer = baseContainerRef.current;
        const runner = runnerRef.current;
        let isMouseDown = false;

        if (!(baseContainer && runner)) {
            return;
        }

        const handleMouseMove = (event: MouseEvent) => {
            if (!isMouseDown) {
                return;
            }

            checkRunnerPosition(
                baseContainer,
                runner,
                event.clientX,
                updatePosition
            );
        };

        const handleOnClick = (event: MouseEvent) => {
            checkRunnerPosition(
                baseContainer,
                runner,
                event.clientX,
                updatePosition
            );
        };

        const handleMouseUp = () => {
            isMouseDown = false;
        };

        const handleMouseDown = () => {
            isMouseDown = true;
        };

        runner.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseup', handleMouseUp);
        runner.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        baseContainer.addEventListener('click', handleOnClick);

        return () => {
            runner.removeEventListener('mouseup', handleMouseUp);
            document.addEventListener('mouseup', handleMouseUp);
            runner.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            baseContainer.removeEventListener('click', handleOnClick);
        };
    }, []);

    return (
        <div
            className={styles.base}
            ref={baseContainerRef}
            onDragStart={(e) => e.preventDefault()}
        >
            <div className={cx(styles.range, styles.range__inProgress)} />
            <div className={cx(styles.range, styles.range__completed)} />
            <div className={styles.label} />
            <div className={styles.runner} ref={runnerRef} />
        </div>
    );
};
