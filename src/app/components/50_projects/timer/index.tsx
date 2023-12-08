'use client';

import React from 'react';
import styles from './styles.module.scss';
import { ElectroWatch } from './electroWatch';

export const Timer = () => {
    const secondArrowRef = React.useRef<HTMLDivElement | null>(null);
    const minuteArrowRef = React.useRef<HTMLDivElement | null>(null);
    const hourArrowRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
        const secondArrow = secondArrowRef.current;
        const minuteArrow = minuteArrowRef.current;
        const hourArrow = hourArrowRef.current;

        if (!(secondArrow && minuteArrow && hourArrow)) {
            return;
        }

        const intervalId = setInterval(() => {
            const currentDate = new Date();
            const minute = currentDate.getMinutes();
            const hour = currentDate.getHours() % 12 || 12;
            const second = currentDate.getSeconds();

            const currentSecond = (360 / 60) * second;
            const currentMinute =
                (minute * 360) / 60 + (second * (360 / 60)) / 60;
            const currentHour =
                (360 / 12) * hour + (30 / 60) * minute + (0.5 / 60) * second;

            secondArrow.style.transform = `rotate(${currentSecond}deg)`;
            minuteArrow.style.transform = `rotate(${currentMinute}deg)`;
            hourArrow.style.transform = `rotate(${currentHour}deg)`;
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
