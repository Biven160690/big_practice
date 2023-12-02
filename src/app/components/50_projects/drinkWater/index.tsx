import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

export type GlassesProps = {
    updateIndex: () => void;
    glassesState: GlassesState;
};

const Glasses = ({ updateIndex, glassesState }: GlassesProps) => {
    return (
        <div
            className={cx(
                styles.container,
                styles[`container__${glassesState}`]
            )}
            onClick={updateIndex}
        >
            <p>250 ml</p>
        </div>
    );
};

const glassesState = {
    full: 'full',
    empty: 'empty',
} as const;

type ValueOf<T> = T[keyof T];
export type GlassesState = ValueOf<typeof glassesState>;

const getContainerMeasurement = (selecredGlasses: number) => ({
    fullContainerPercent: (selecredGlasses * 250 * 100) / 2000,
    emptyContainerPercent: 2000 - selecredGlasses * 250,
});

const getGlassesState = (activeIndex: number, index: number) => {
    if (activeIndex >= index) {
        return glassesState.full;
    }

    return glassesState.empty;
};

export const DrinkWater = () => {
    const [activeIndex, setActiveIndex] = React.useState<number>(-1);

    const handleUpdateIndex = (index: number) =>
        setActiveIndex((prev) => (prev === index ? index - 1 : index));

    const { fullContainerPercent, emptyContainerPercent } =
        getContainerMeasurement(activeIndex === -1 ? 0 : activeIndex + 1);

    return (
        <div className={styles.base}>
            <div className={styles.block}>
                <div className={styles.waterСontainer}>
                    <div
                        className={styles.emptyContainer}
                        style={{ height: `${emptyContainerPercent / 20}%` }}
                    >
                        <p
                            className={cx(
                                styles.litertage,
                                !emptyContainerPercent &&
                                    styles.litertage__hide
                            )}
                        >
                            <span>{emptyContainerPercent / 1000}</span>
                            <span>L</span>
                        </p>
                    </div>
                    <div
                        className={styles.fullContainer}
                        style={{ height: `${fullContainerPercent}%` }}
                    >
                        <p
                            className={cx(
                                styles.percentage,
                                !fullContainerPercent &&
                                    styles.percentage__hide
                            )}
                        >
                            <span>{fullContainerPercent}</span>
                            <span>%</span>
                        </p>
                    </div>
                </div>
                <div className={styles.glasses}>
                    {new Array(8).fill(0).map((_, index) => {
                        return (
                            <Glasses
                                key={index}
                                updateIndex={() => handleUpdateIndex(index)}
                                glassesState={getGlassesState(
                                    activeIndex,
                                    index
                                )}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
