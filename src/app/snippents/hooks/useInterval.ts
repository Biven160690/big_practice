import React from 'react';

export type ReturnType = { [key: string]: () => void };

export const useInterval = (
    handler: () => void,
    delay: number | null = null
): ReturnType => {
    const handlerRef = React.useRef<() => void>(handler);
    const delayRef = React.useRef<number | null>(delay);
    const intervalId = React.useRef<NodeJS.Timeout | null>(null);

    React.useLayoutEffect(() => {
        handlerRef.current = handler;
        delayRef.current = delay;
    });

    const manageInterval = React.useMemo(() => {
        const start = () => {
            if (delayRef.current !== null) {
                intervalId.current = setInterval(
                    () => handlerRef.current(),
                    delayRef.current
                );
            }
        };

        const clear = () => {
            if (intervalId.current !== null) {
                clearTimeout(intervalId.current);
            }
        };

        return {
            start,
            clear,
            reset: () => {
                clear();
                start();
            },
        };
    }, []);

    React.useEffect(() => {
        return () => manageInterval.clear();
    }, [manageInterval]);

    return manageInterval;
};
