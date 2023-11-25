import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export const RotatingBG = () => {
    const [isRotate, setIsRotate] = React.useState<boolean>(false);
    return (
        <div className={styles.base}>
            <div className={cx(styles.main, isRotate && styles.main__rotate)} />
            <div
                className={styles.button}
                onClick={() => setIsRotate((prev) => !prev)}
            />
            <div className={cx(styles.navContainer, isRotate && styles.navContainer__show)}>
                <div className={styles.nav} />
                <div className={styles.nav} />
                <div className={styles.nav} />
            </div>
        </div>
    );
};
