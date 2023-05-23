import { ProgressBar } from './components/progressBar/ProgressBar';

import styles from './page.module.scss';

export default function App() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.progressBarContainer}>
                    <ProgressBar />
                </div>
            </div>
        </div>
    );
}
