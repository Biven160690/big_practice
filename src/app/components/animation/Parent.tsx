'use client';

import { animated, useSpring } from 'react-spring';

import { Child } from './Child';

import { childrenDelay, commonStyles } from './helper';

import styles from './animation.module.scss';

export type Props = {
    elements: number[];
    delay: number;
};

export const Parent = ({ elements, delay }: Props) => {
    const style = useSpring({
        ...commonStyles,
        delay,
    });

    return (
        <animated.div className={styles.parent} style={style} data-testId="parent">
            {elements.map((child, index) => {
                return <Child key={child} delay={delay + childrenDelay * (index + 1)} />;
            })}
        </animated.div>
    );
};