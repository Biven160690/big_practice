import { WheelEvent } from 'react';

import { useDragController } from '../hooks/useDragController';

import styles from './styles.module.scss';

export type ScrollProps = React.PropsWithChildren<{
    scrollAreaRef?: React.RefObject<HTMLDivElement>;
    containerRef?: React.RefObject<HTMLDivElement>;
    isDragged?: boolean;
    onMouseWheel?: (e: WheelEvent<HTMLDivElement>) => void;
}>;

export type ContainerProps = Omit<ScrollProps, 'onMouseWheel'> & {
    handleMouseWheel?: (e: WheelEvent<HTMLDivElement>) => void;
};

export const Container = ({
    children,
    containerRef,
    handleMouseWheel,
    scrollAreaRef,
    isDragged = false,
}: ContainerProps) => {
    useDragController(scrollAreaRef, isDragged);
    return (
        <div
            ref={containerRef}
            className={styles.body}
            onWheel={handleMouseWheel}
        >
            {children}
        </div>
    );
};

const Horizon = ({
    children,
    scrollAreaRef,
    containerRef,
    onMouseWheel,
    isDragged,
}: ScrollProps) => {
    return (
        <Container
            containerRef={containerRef}
            scrollAreaRef={scrollAreaRef}
            isDragged={isDragged}
            handleMouseWheel={onMouseWheel}
        >
            <div ref={scrollAreaRef} className={styles.horizonArea}>
                {children}
            </div>
        </Container>
    );
};

const Vertical = ({
    children,
    scrollAreaRef,
    containerRef,
    onMouseWheel,
    isDragged,
}: ScrollProps) => {
    return (
        <Container
            containerRef={containerRef}
            scrollAreaRef={scrollAreaRef}
            isDragged={isDragged}
            handleMouseWheel={onMouseWheel}
        >
            <div ref={scrollAreaRef} className={styles.verticalArea}>
                {children}
            </div>
        </Container>
    );
};

export const Scroll = {
    Horizon,
    Vertical,
};
