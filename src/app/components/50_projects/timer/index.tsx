'use client';

import React from 'react';
import styles from './styles.module.scss';
import { ElectroWatch } from './electroWatch';

export type PositionArrows = {
    second: number;
    minute: number;
    hour: number;
};

export const ARROWS = {
    second: 'second',
    minute: 'minute',
    hour: 'hour',
} as const;

const HORDES = {
    second: 6,
    minute: 0.10169491525423729,
    hour: 0.0002898572185849118,
} as const;

const STARTING_HORDES = {
    second: 6,
    minute: 6,
    hour: 30,
} as const;

export type ValueOf<T> = Required<T>[keyof T];

export type Keys = ValueOf<typeof ARROWS>;

export type PositionArrowsRef = React.MutableRefObject<PositionArrows>;

const getPosition = (positionArrows: PositionArrowsRef, key: Keys) => {
    if (positionArrows.current[key] >= 360) {
        return (positionArrows.current[key] = HORDES[key]);
    }

    return (positionArrows.current[key] += HORDES[key]);
};

export const getStartingPosition = (startingHorde?: number): PositionArrows => {
    const currentDate = new Date();
    const { second, minute, hour } = STARTING_HORDES;

    return {
        second: currentDate.getSeconds() * (startingHorde || second),
        minute: currentDate.getMinutes() * (startingHorde || minute),
        hour: (currentDate.getHours() % 12 || 12) * (startingHorde || hour),
    };
};

export const Timer = () => {
    const secondArrowRef = React.useRef<HTMLDivElement | null>(null);
    const minuteArrowRef = React.useRef<HTMLDivElement | null>(null);
    const hourArrowRef = React.useRef<HTMLDivElement | null>(null);
    const positionArrows = React.useRef<PositionArrows>(getStartingPosition());

    React.useLayoutEffect(() => {
        const secondArrow = secondArrowRef.current;
        const minuteArrow = minuteArrowRef.current;
        const hourArrow = hourArrowRef.current;

        if (!(secondArrow && minuteArrow && hourArrow)) {
            return;
        }

        const { second, minute, hour } = positionArrows.current;

        secondArrow.style.transform = `rotate(${second}deg)`;
        minuteArrow.style.transform = `rotate(${minute}deg)`;
        hourArrow.style.transform = `rotate(${hour}deg)`;
    }, []);

    React.useEffect(() => {
        const secondArrow = secondArrowRef.current;
        const minuteArrow = minuteArrowRef.current;
        const hourArrow = hourArrowRef.current;

        if (!(secondArrow && minuteArrow && hourArrow)) {
            return;
        }

        const intervalId = setInterval(() => {
            secondArrow.style.transform = `rotate(${getPosition(
                positionArrows,
                ARROWS.second
            )}deg)`;
            minuteArrow.style.transform = `rotate(${getPosition(
                positionArrows,
                ARROWS.minute
            )}deg)`;
            hourArrow.style.transform = `rotate(${getPosition(
                positionArrows,
                ARROWS.hour
            )}deg)`;
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <React.Fragment>
            <div className={styles.base}>
                <div className={styles.timeBlock}>
                    <div className={styles.arrowContainer} ref={secondArrowRef}>
                        <div className={styles.second} />
                        <div className={styles.centerPoint} />
                    </div>
                    <div className={styles.arrowContainer} ref={minuteArrowRef}>
                        <div className={styles.minute} />
                    </div>
                    <div className={styles.arrowContainer} ref={hourArrowRef}>
                        <div className={styles.hour} />
                    </div>
                </div>
                <ElectroWatch />
            </div>
        </React.Fragment>
    );
};
