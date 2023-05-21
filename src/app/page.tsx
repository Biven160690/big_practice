import { AnimationElements } from './components/animation/AnimationElements';
import styles from './page.module.scss';

export default function App() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.animatedContainer}>
                    <AnimationElements />
                </div>
            </div>
        </div>
    );
}
