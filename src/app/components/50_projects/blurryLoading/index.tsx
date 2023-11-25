import { useSpring, animated } from 'react-spring';
import styles from './styles.module.scss';
import React from 'react';

export const BlurryLoading = () => {
    const containerBg = React.useRef<HTMLDivElement>(null);
    const containerNumber = React.useRef<HTMLDivElement>(null);
    const requestID = React.useRef<number>();

    const { number } = useSpring({
        from: { number: 0 },
        to: { number: 100 },
        config: { duration: 1500 },
        onRest: () => {
            if (!requestID.current) {
                return;
            }
            cancelAnimationFrame(requestID.current);
        },
    });

    const updateStyles = React.useCallback(() => {
        const bg = containerBg.current;
        const numbers = containerNumber.current;

        if (!bg || !numbers) {
            return;
        }

        number.to((val) => {
            const flooredNumber = Math.floor(val);

            bg.style.filter = `${4 / flooredNumber}px`;
            numbers.style.opacity = `${1 - (.99 * flooredNumber) / 100}`;
        });

        requestID.current = requestAnimationFrame(updateStyles);
    }, [number]);

    React.useEffect(() => {
        updateStyles();
    }, [updateStyles]);

    return (
        <div className={styles.base}>
            <div className={styles.bg} ref={containerBg} />
            <div className={styles.container} ref={containerNumber}>
                <animated.div className={styles.number} >
                    {number.to((val) => Math.floor(val))}
                </animated.div>
                <div className={styles.percent}>%</div>
            </div>
        </div>
    );
};
