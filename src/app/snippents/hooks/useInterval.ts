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

    const start = React.useCallback(() => {
        if (delayRef.current !== null) {
            intervalId.current = setInterval(
                () => handlerRef.current(),
                delayRef.current
            );
        }
    }, []);

    const clear = React.useCallback(() => {
        if (intervalId.current !== null) {
            clearTimeout(intervalId.current);
        }
    }, []);

    const reset = React.useCallback(() => {
        clear();
        start();
    }, [clear, start]);

    React.useEffect(() => {
        return () => clear();
    }, [clear]);

    return React.useMemo(
        () => ({ pause: clear, reset, start }),
        [clear, reset, start]
    );
};
