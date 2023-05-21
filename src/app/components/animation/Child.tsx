'use client';

import { animated, useSpring } from 'react-spring';

import styles from './animation.module.scss';

import { commonStyles } from './helper';

export type Props = {
    delay: number;
};

export const Child = ({ delay }: Props) => {
    const style = useSpring({
        ...commonStyles,
        delay,
    });

    return <animated.div className={styles.child} style={style} data-testId="child"/>;
};