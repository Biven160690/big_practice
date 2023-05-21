'use client';

import React from 'react';
import { useSprings } from 'react-spring';

import { styles, getAnimationDelays } from './helper';

export type Props = {
    children: JSX.Element[];
};

export const AnimationWrapper = ({ children }: Props) => {
    const [props] = useSprings(styles.length, (index) => ({
        ...styles[index],
        delay: getAnimationDelays(styles.length)[index],
    }));

    return (
        <React.Fragment>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    style: props[index],
                })
            )}
        </React.Fragment>
    );
};
