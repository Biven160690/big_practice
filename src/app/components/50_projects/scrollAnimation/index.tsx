import React from 'react';
import styles from './stules.module.scss';

export const ScrollAnimation = () => {
    const blockRef = React.useRef<HTMLDivElement | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const block = blockRef.current;
        const container = containerRef.current;

        if (!block || !container) {
            return;
        }

        const handleScroll = () => {
            const blockBottom = block.getBoundingClientRect().bottom - 150;

            Array.from(container.children).forEach((element) => {
                const elementTop = element.getBoundingClientRect().top;

                if (elementTop < blockBottom) {
                    element.classList.add(styles.show);
                } else {
                    element.classList.remove(styles.show);
                }
            });
        };

        handleScroll();
        block.addEventListener('scroll', handleScroll);

        return () => {
            block.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.block} ref={blockRef}>
            <div className={styles.container} ref={containerRef}>
                {new Array(10).fill(0).map((_, index) => {
                    return <div className={styles.card} key={index} />;
                })}
            </div>
        </div>
    );
};
