'use client';

import { List } from './List';
import { Parent } from './Parent';

import { example, getAnimationDelays } from './helper';

import styles from './animation.module.scss';

export const AnimationElements = () => {
    return (
        <div className={styles.container}>
            <List />
            {example.map(({ elements }, index) => {
                const delay = getAnimationDelays(
                    example.length,
                    elements.length
                )[index];
                return <Parent key={index} elements={elements} delay={delay} />;
            })}
        </div>
    );
};
