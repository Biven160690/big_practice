'use client';

import React from 'react';
import styles from './styles.module.scss';

export type PositionArrows = {
    second: string | number;
    minute: string | number;
    hour: number;
};

const transformTime = (time: number) => (time < 10 ? `0${time}` : time);

export const getStartingPosition = () => {
    const currentDate = new Date();
    const minute = transformTime(currentDate.getMinutes());
    const hour = currentDate.getHours() % 12 || 12;
    const second = transformTime(currentDate.getSeconds());

    return {
        second,
        minute,
        hour,
    };
};

export const ElectroWatch = () => {
    const [positionArrow, setPositionArrow] = React.useState<PositionArrows>(
        () => getStartingPosition()
    );

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            const { second, minute, hour } = getStartingPosition();

            setPositionArrow({
                second,
                minute,
                hour,
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.base}>
            <div>{positionArrow.hour}:</div>
            <div>{positionArrow.minute}:</div>
            <div>{positionArrow.second}</div>
        </div>
    );
};
