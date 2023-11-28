import styles from './styles.module.scss';

export const SplitLandingPage = () => {
    return (
        <div className={styles.base}>
            <div className={styles.leftContainer}>
                <p>Дима</p>
            </div>
            <div className={styles.rightContainer}>
                <p>Юра</p>
            </div>
        </div>
    );
};
