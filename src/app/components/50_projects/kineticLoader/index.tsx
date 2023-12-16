import styles from './styles.module.scss';

export const KineticLoader = () => {
    return (
        <div className={styles.base}>
            <div className={styles.triangleA} />
            <div className={styles.triangleB} />
        </div>
    );
};
