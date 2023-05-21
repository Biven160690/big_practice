import { animated } from 'react-spring';

import { AnimationWrapper } from './AnimationWrapper';

import styles from './animation.module.scss';

export const List = () => {
    return (
        <div className={styles.awardContainer} data-testid='list'>
            <AnimationWrapper>
                <animated.div className={styles.square} />
                <animated.div className={styles.circle} />
                <animated.div className={styles.triangleTop} />
                <animated.div className={styles.triangleBottom} />
            </AnimationWrapper>
        </div>
    );
};
