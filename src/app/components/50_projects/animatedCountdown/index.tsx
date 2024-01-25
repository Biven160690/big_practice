import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

const animationState = {
    exit: 'exit',
    show: 'show',
} as const;

const getAnimationState = (isFinishCountdown: boolean) => {
    if (isFinishCountdown) {
        return animationState.exit;
    }

    return animationState.show;
};

export const AnimatedCountdown = () => {
    const [isFinishCountdown, setIsFinishCountdown] =
        React.useState<boolean>(false);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsFinishCountdown(true);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [isFinishCountdown]);

    return (
        <div
            className={cx(
                styles.base,
                styles[`base__${getAnimationState(isFinishCountdown)}`]
            )}
        >
            <div className={styles.container}>
                <div className={styles.numberContainer}>
                    <div className={styles.number}>3</div>
                </div>
                <div className={styles.numberContainer}>
                    <div className={styles.number}>2</div>
                </div>
                <div className={styles.numberContainer}>
                    <div className={styles.number}>1</div>
                </div>
                <div className={styles.numberContainer}>
                    <div className={styles.number}>0</div>
                </div>
                <div className={styles.info}>Get ready</div>
            </div>
            <div className={styles.replayContainer}>
                <h1>GO</h1>
                <button onClick={() => setIsFinishCountdown((prev) => !prev)}>
                    Replay
                </button>
            </div>
        </div>
    );
};
