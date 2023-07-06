import React, { WheelEvent } from 'react';
import cx from 'classnames';

import { Container } from '../scroll';

import styles from './styles.module.scss';

export type DefaultProps = React.PropsWithChildren<{
    scrollAreaRef?: React.RefObject<HTMLDivElement>;
    containerRef?: React.RefObject<HTMLDivElement>;
    isDragged?: boolean;
    onMouseWheel?: (e: WheelEvent<HTMLDivElement>) => void;
}>;

export type InfiniteProps = Omit<
    DefaultProps,
    'scrollAreaRef' | 'containerRef'
> & {
    step: number;
    cardPosition: number[];
    classNames?: {
        body?: string;
        block?: string;
    };
};

const Default = ({
    children,
    scrollAreaRef,
    containerRef,
    onMouseWheel,
    isDragged,
}: DefaultProps) => {
    return (
        <Container
            containerRef={containerRef}
            scrollAreaRef={scrollAreaRef}
            isDragged={isDragged}
            handleMouseWheel={onMouseWheel}
        >
            <div ref={scrollAreaRef} className={styles.body}>
                {children}
            </div>
        </Container>
    );
};

const Infinite = ({
    onMouseWheel,
    children,
    step,
    cardPosition,
    classNames,
}: InfiniteProps) => {
    return (
        <Container handleMouseWheel={onMouseWheel}>
            <div className={cx(styles.body, classNames?.body)}>
                <div className={cx(styles.block, classNames?.block)}>
                    {React.Children.map(children, (child, index) => {
                        if (!React.isValidElement(child)) {
                            return null;
                        }

                        const props = {
                            style: {
                                position: 'absolute',
                                transform: `translateX(${
                                    cardPosition[index] * step
                                }px)`,
                            },
                        };

                        return React.cloneElement(child, props);
                    })}
                </div>
            </div>
        </Container>
    );
};

export const Carousel = {
    Default,
    Infinite,
};
