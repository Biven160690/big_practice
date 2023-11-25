import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

const getButtonState = (activeIndex: number) => {
    if (activeIndex === 0) {
        return 'disabledPrevButton';
    }

    if (activeIndex === 3) {
        return 'disabledNextButton';
    }

    return 'active';
};

export const ProgressBarSteps = () => {
    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    const handlerClickPrevButton = () => {
        if (activeIndex === 0) return;

        setActiveIndex((prev) => prev - 1);
    };

    const handlerClickNextButton = () => {
        if (activeIndex === 3) return;

        setActiveIndex((prev) => prev + 1);
    };
    return (
        <div className={styles.base}>
            <div className={styles.container}>
                {new Array(4).fill(0).map((_, index) => {
                    return (
                        <div
                            className={cx(
                                styles.block,
                                index <= activeIndex && styles.block__active
                            )}
                            key={index}
                        >
                            {index > 0 && (
                                <div className={styles.progessBarContainer}>
                                    <div
                                        className={styles.progressBarInactive}
                                    />
                                    <div className={styles.progressBarActive} />
                                </div>
                            )}
                            <div className={styles.point}>{index + 1}</div>
                        </div>
                    );
                })}
            </div>
            <div
                className={cx(
                    styles.buttonContainer,
                    styles[`buttonContainer__${getButtonState(activeIndex)}`]
                )}
            >
                <button onClick={handlerClickPrevButton}>prev</button>
                <button onClick={handlerClickNextButton}>next</button>
            </div>
        </div>
    );
};
