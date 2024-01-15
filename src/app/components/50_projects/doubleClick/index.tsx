import React from 'react';
import styles from './styles.module.scss';

export const DoubleClick = () => {
    const baseRef = React.useRef<HTMLDivElement | null>(null);
    const heartRef = React.useRef<HTMLDivElement | null>(null);
    const [amountDoubleClick, setAmountDoubleClick] = React.useState<number>(0);

    React.useEffect(() => {
        const base = baseRef.current;
        const heart = heartRef.current;
        let animationend = true;
        let amountClicks = 0;

        if (!(base && heart)) {
            return;
        }

        const handleClick = (event: MouseEvent) => {
            const { top, left } = base.getBoundingClientRect();
            const { width, height } = heart.getBoundingClientRect();
            const { clientX, clientY } = event;
            amountClicks++;
                
            if (animationend && !(amountClicks % 2)) {                
                setAmountDoubleClick((prev) => prev + 1);
                heart.classList.add(styles.heart__showHeart);
                heart.style.top = `${clientY - top - height / 2}px`;
                heart.style.left = `${clientX - left - width / 2}px`;
                animationend = false;
            }
        };

        const handleAnimationend = () => {
            animationend = true;
            heart.classList.remove(styles.heart__showHeart);
        };

        base.addEventListener('click', handleClick);
        heart.addEventListener('animationend', handleAnimationend);

        return () => {
            base.removeEventListener('click', handleClick);
            heart.removeEventListener('animationend', handleAnimationend);
        };
    }, []);

    return (
        <div className={styles.base} ref={baseRef}>
            {amountDoubleClick}
            <div className={styles.card}>
                <div className={styles.heart} ref={heartRef}>
                    <div className={styles.leftSide} />
                    <div className={styles.rightSide} />
                </div>
            </div>
        </div>
    );
};
